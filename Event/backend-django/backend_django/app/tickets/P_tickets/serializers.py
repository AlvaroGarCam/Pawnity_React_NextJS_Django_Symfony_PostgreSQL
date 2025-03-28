from rest_framework import serializers
from .models import P_TicketInfo

class P_TicketInfoSerializer(serializers.ModelSerializer):
     """
     Serializador para representar la información de los tickets asociados a los eventos.
     """

     class Meta:
          model = P_TicketInfo
          fields = [
               "idticketinfo",
               "eventslug",
               "type",
               "price",
               "capacity",
               "remaining",
               "descripcion",
               "isactive",
               "createdat",
               "updatedat",
          ]
          read_only_fields = ["idticketinfo", "createdat", "updatedat"]
