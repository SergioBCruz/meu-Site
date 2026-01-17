from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class PostBase(BaseModel):
    titulo: str
    conteudo: str
    autor: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    criado_em: datetime
    atualizado_em: datetime
    
    class Config:
        from_attributes = True

class ComentarioBase(BaseModel):
    texto: str
    autor: str

class ComentarioCreate(ComentarioBase):
    pass

class Comentario(ComentarioBase):
    id: int
    post_id: int
    criado_em: datetime
    
    class Config:
        from_attributes = True
