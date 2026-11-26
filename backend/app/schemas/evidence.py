
from datetime import datetime

from pydantic import BaseModel, ConfigDict

class EvidenceResponse(BaseModel):
    id: int
    incident_id: int
    file_name: str
    file_path: str
    file_type: str
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)