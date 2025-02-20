from rest_framework import serializers
from .models import E_Order, E_OrderLine, E_TicketUnit


# 🎫 SERIALIZER: TicketUnit
class E_TicketUnitSerializer(serializers.ModelSerializer):
     class Meta:
          model = E_TicketUnit
          fields = [
               'idticketunit',
               'idorder',
               'idticketinfo',
               'code',
               'unitprice',
               'complements',
               'nameassistant',
               'dniassistant',
               'status',
               'createdat',
               'updatedat'
          ]


# 🧾 SERIALIZER: OrderLine
class E_OrderLineSerializer(serializers.ModelSerializer):
     class Meta:
          model = E_OrderLine
          fields = [
               'idorderline',
               'idorder',
               'itemtype',
               'itemid',
               'quantity',
               'discount',
               'subtotal',
               'status',
               'createdat',
               'updatedat'
          ]


# 📦 SERIALIZER: Order con OrderLines + TicketUnits
class E_OrderDetailSerializer(serializers.ModelSerializer):
     orderlines = serializers.SerializerMethodField()
     ticketunits = serializers.SerializerMethodField()

     class Meta:
          model = E_Order
          fields = [
               'idorder',
               'idclient',
               'idevent',
               'subtotaltickets',
               'subtotalcomplements',
               'totalprice',
               'payment',
               'paymentreference',
               'paymentstatus',
               'status',
               'datepurchase',
               'createdat',
               'updatedat',
               'orderlines',   # 🔗 Relación con OrderLines
               'ticketunits'   # 🔗 Relación con TicketUnits
          ]

     def get_orderlines(self, obj):
          """Obtiene las líneas de pedido relacionadas con la orden."""
          orderlines = E_OrderLine.objects.filter(idorder=obj.idorder)
          return E_OrderLineSerializer(orderlines, many=True).data

     def get_ticketunits(self, obj):
          """Obtiene las unidades de tickets relacionadas con la orden."""
          tickets = E_TicketUnit.objects.filter(idorder=obj.idorder)
          return E_TicketUnitSerializer(tickets, many=True).data
