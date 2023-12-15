from app.plugins import PluginBase, MountPoint
from .api import GetTaskFormViewSet
from .app_views import LoadButtonsView


class Plugin(PluginBase):
    def include_js_files(self):
        return ['load_buttons.js']

    def build_jsx_components(self):
        return ['form.jsx']

    def app_mount_points(self):
        return [
            MountPoint("load_buttons.js$", LoadButtonsView(self)),
        ]

    def api_mount_points(self):
        return [
            MountPoint('task/(?P<pk>[^/.]+)', GetTaskFormViewSet.as_view()),
        ]
