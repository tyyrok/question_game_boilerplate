import os
from pathlib import Path

from django.core.asgi import get_asgi_application

ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()

from game import routing

from channels.routing import ProtocolTypeRouter, URLRouter
from authentication.middleware import TokenAuthMiddleware

application = ProtocolTypeRouter(
    {
        'http': get_asgi_application(),
        'websocket': TokenAuthMiddleware(URLRouter(routing.websocket_urlpatterns)),
    }
)