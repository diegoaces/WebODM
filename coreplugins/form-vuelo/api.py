from rest_framework import status
from app.plugins.views import TaskView

import logging
from rest_framework.response import Response
from app.plugins import GlobalDataStore

logger = logging.getLogger('app.logger')


class GetTaskFormViewSet(TaskView):
    def get(self, request, pk=None):
        ds = GlobalDataStore('forms')

        task = self.get_and_check_task(request, pk)
        task_id = str(task.id)

        form = ds.get_json(task_id, default=None)

        if form is None:
            return Response({'error': "This task does not have a form."}, status=status.HTTP_404_NOT_FOUND)
        return Response({'form': form, 'task': task_id}, status=status.HTTP_200_OK)

    def post(self, request, pk=None):
        ds = GlobalDataStore('forms')

        task = self.get_and_check_task(request, pk)
        task_id = str(task.id)
        ds.set_json(task_id, request.data)

        return Response({'success': True}, status=status.HTTP_201_CREATED)
