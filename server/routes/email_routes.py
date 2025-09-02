from fastapi import APIRouter, UploadFile, File
from server.schemas.email_schema import EmailText
from server.services.email_service import classify_and_reply, extract_text_from_file

router = APIRouter(prefix="/email", tags=["Emails"])

@router.post("/classify")
async def classify_email(email: EmailText):
    category, reply = classify_and_reply(email.text)
    return {
        "category": category,
        "reply": reply
    }

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await extract_text_from_file(file)
    category, reply = classify_and_reply(content)
    return {
        "category": category, 
        "reply": reply, 
        "preview": content[:300]
    }