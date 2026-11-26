
import enum

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.sql import func

from app.db.database import Base


class DamageType(str, enum.Enum):
    FLOOD = "flood"
    HEAVY_RAIN = "heavy_rain"
    ANIMAL = "animal"
    PEST = "pest"
    OTHER = "other"


class IncidentStatus(str, enum.Enum):
    PENDING = "pending"
    ACKNOWLEDGED = "acknowledged"
    VERIFIED = "verified"
    APPROVED = "approved"
    REJECTED = "rejected"
    PAID = "paid"


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    farmer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    damage_type = Column(Enum(DamageType), nullable=False)
    description = Column(Text, nullable=False)

    village = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    status = Column(
        Enum(IncidentStatus),
        nullable=False,
        default=IncidentStatus.PENDING,
    )

    incident_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
