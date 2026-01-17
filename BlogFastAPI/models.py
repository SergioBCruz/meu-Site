from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(200), index=True)
    conteudo = Column(Text)
    autor = Column(String(100))
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Comentario(Base):
    __tablename__ = "comentarios"
    
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer)
    texto = Column(Text)
    autor = Column(String(100))
    criado_em = Column(DateTime, default=datetime.utcnow)
