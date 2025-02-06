from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from .models import E_Event
from .serializers import E_EventSerializer, E_EventDetailSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from math import ceil

class E_EventPagination(PageNumberPagination):
     """
     Configuración de paginación para la lista de eventos.
     """
     page_size = 5
     page_size_query_param = 'page_size'
     max_page_size = 100

     def get_paginated_response(self, data):
          """
          Personaliza la respuesta de la paginación para que muestre el número de página en lugar de URLs.
          """
          total_items = self.page.paginator.count
          total_pages = ceil(total_items / self.page_size)
          current_page = self.page.number
          next_page = self.page.next_page_number() if self.page.has_next() else None
          previous_page = self.page.previous_page_number() if self.page.has_previous() else None

          return Response({
               "count": total_items,
               "total_pages": total_pages,
               "current_page": current_page,
               "previous": previous_page,
               "next": next_page,
               "results": data
          })

class E_EventViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar los eventos de Eventeco.

     - **Listar eventos:** `list()`
     - **Listar todos los eventos (custom action):** `list_events()`
     """

     queryset = E_Event.objects.all().order_by('idevent')
     serializer_class = E_EventSerializer
     lookup_field = 'idevent'
     pagination_class = E_EventPagination  # Usamos la paginación configurada

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los eventos disponibles en Eventeco con filtros y paginación.",
          responses={200: E_EventSerializer(many=True)},
          manual_parameters=[
               openapi.Parameter('categorySlug', openapi.IN_QUERY, description="Slug de la categoría de los eventos", type=openapi.TYPE_STRING),
               openapi.Parameter('location', openapi.IN_QUERY, description="Ubicación de los eventos", type=openapi.TYPE_STRING),
               openapi.Parameter('order_by_date', openapi.IN_QUERY, description="Ordenar por fecha (asc/desc)", type=openapi.TYPE_STRING),
               openapi.Parameter('page', openapi.IN_QUERY, description="Número de página para la paginación", type=openapi.TYPE_INTEGER),
          ]
     )
     def list_events(self, request):
          """
          Devuelve una lista de eventos registrados en Eventeco, con filtros y paginación.

          **Parámetros de consulta:**
          - **categorySlug**: Slug de la categoría para filtrar.
          - **location**: Filtra por ubicación de los eventos.
          - **order_by_date**: Ordena los eventos por fecha (ascendente o descendente).
          - **page**: Número de página para la paginación (por defecto página 1).

          **Retorna:**
          - 200 OK: Lista de eventos en formato JSON con información de paginación.
          """
          category_slug = request.query_params.get('categorySlug')
          location = request.query_params.get('location')
          order_by_date = request.query_params.get('order_by_date')
          page = request.query_params.get('page', 1)  # Valor por defecto 1

          # Filtramos los eventos
          queryset = self.get_queryset()
          if category_slug:
               queryset = queryset.filter(idcategory__categoryslug=category_slug)  

          if location:
               queryset = queryset.filter(location__icontains=location)

          if order_by_date:
               if order_by_date.lower() == 'asc':
                    queryset = queryset.order_by('startdate')
               elif order_by_date.lower() == 'desc':
                    queryset = queryset.order_by('-startdate')

          # Aplicar paginación
          paginator = self.pagination_class()
          result_page = paginator.paginate_queryset(queryset, request)
          serializer = self.get_serializer(result_page, many=True)

          return paginator.get_paginated_response(serializer.data)

class E_EventDetailViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para obtener los detalles de un evento en Eventeco.

     - **Obtener detalles de un evento:** `retrieve_event_details()`
     """
     queryset = E_Event.objects.all()
     serializer_class = E_EventDetailSerializer
     lookup_field = 'eventslug'

     @swagger_auto_schema(
          operation_description="Obtiene los detalles de un evento específico en Eventeco basado en su slug.",
          responses={200: E_EventDetailSerializer()},
          manual_parameters=[
               openapi.Parameter('eventslug', openapi.IN_PATH, description="Slug del evento", type=openapi.TYPE_STRING),
          ]
     )
     @action(detail=True, methods=['get'], url_path='details')
     def retrieve_event_details(self, request, eventslug=None):
          """
          Devuelve los detalles de un evento específico basado en su slug.

          **Parámetros:**
          - **eventslug**: Identificador único del evento.

          **Retorna:**
          - 200 OK: Detalles del evento en formato JSON.
          - 404 Not Found: Si el evento no existe.
          """
          event = get_object_or_404(E_Event, eventslug=eventslug)
          serializer = self.get_serializer(event)
          return Response(serializer.data, status=status.HTTP_200_OK)
