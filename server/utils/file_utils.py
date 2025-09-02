import fitz  
from fastapi import UploadFile

async def read_txt(file: UploadFile) -> str:
    return (await file.read()).decode("utf-8", errors="ignore")

async def read_pdf(file: UploadFile) -> str:
    pdf_bytes = await file.read()
    pdf_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    content = ""
    for page in pdf_doc:
        content += page.get_text("text")
    return content
    