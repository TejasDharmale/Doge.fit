from fastapi import APIRouter
from .auth import router as auth_router
from .products import router as products_router
from .orders import router as orders_router
from .coupons import router as coupons_router
from .leads import router as leads_router
from .newsletter import router as newsletter_router

main_router = APIRouter()
main_router.include_router(auth_router)
main_router.include_router(products_router)
main_router.include_router(orders_router)
main_router.include_router(coupons_router)
main_router.include_router(leads_router)
main_router.include_router(newsletter_router)

