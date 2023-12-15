PluginsAPI.Dashboard.addTaskActionButton(['form-vuelo/build/Form.js'], function (args, Form) {
        var task = args.task;
        return React.createElement(Form, {taskId: task.id, apiURL: "{{ api_url }}",});
    }
);