define(['collections/notes', 'models/notebook', 'views/app', 'views/notebook', 'views/pageButtons'/*, 'stores/simplenote'*/],

    function(Notes, Notebook, AppView, NotebookView, PageButtonsView/*, SimpleNoteStore*/) {

        // override sync to use our store(s)
        // Backbone.sync = function(method, model, options) {

        //     var resp;
        //     var store = model.store || model.collection.store;

        //     switch (method) {
        //         case "read":    resp = model.id ? store.get(model) : store.getAll();    break;
        //         case "create":  resp = store.create(model);                             break;
        //         case "update":  resp = store.update(model);                             break;
        //         case "delete":  resp = store.destroy(model);                            break;
        //     }

        //     if (resp) {
        //         options.success(resp);
        //     } else {
        //         options.error("Note not found");
        //     }
        // };

        var App = function() {

            var context = this;

            _.extend(this, Backbone.Events);

            this.views.app = new AppView({'app': this});

            this.collections.notes = new Notes();

            // this.collections.notes.setStore(new SimpleNoteStore());
            // this.collections.notes.store.getAll();

            this.models.notebook = new Notebook(this.collections.notes);

            this.views.notebook = new NotebookView({'model': this.models.notebook, 'app': this});

            // this.views.notebook.on('noteSelected', this.views.app.affixButtons, this.views.app);

            this.views.notebook.render();

            this.views.pageButtons = new PageButtonsView({'app': this});

            // note:view | note:edit | note:add | multi:view
            this.mode = 'note:view';

            // this.views.app.on('randomiseStyle', $.proxy(function() {
            //     this.views.notebook.getCurrentNoteView().model.setRandomStyle();
            //     this.views.pageButtons.affixButtons(this.views.notebook.getCurrentPageView());
            // }, this));

            $.onshake(function() {
                Backbone.Mediator.pub('note:randomisestyle');
            });

            // stop the window from bouncing
            document.body.addEventListener("touchstart", function(e) {
                if ($('.main').scrollTop() === 0) {
                    $('.main')[0].scrollTop = 1;
                }
            }, false);

            $('.main').on('scroll', function() {
                var pullUpMsg;
                if ($('.main').scrollTop() < 0) {
                    if (heft.mode == 'note:view') {
                        pullUpMsg = 'Add a new note...';
                    } else if (heft.mode == 'note:edit') {
                        pullUpMsg = 'Delete this note...';
                    } else {
                        pullUpMsg = '';
                    }
                    $('#pull-up-msg').html(pullUpMsg);
                }
                if ($('.main').scrollTop() < -100) {
                    $('.main')[0].scrollTop = 1;
                    if (heft.mode == 'note:view') {
                        heft.views.notebook.createNote();
                        Backbone.Mediator.pub('note:add');
                        heft.views.notebook.isScrolling = false;
                    }
                }
            });

            Backbone.Mediator.sub('note:add', function() {
                this.mode = 'note:add';
            }, this);
            Backbone.Mediator.sub('note:edit', function() {
                this.mode = 'note:edit';
            }, this);
            Backbone.Mediator.sub('note:view', function() {
                this.mode = 'note:view';
            }, this);

            // document.body.addEventListener("touchend", function(e) {
            //     this.touchY = undefined;
            // }, false);

        };

        App.prototype = {
            views: {},
            collections: {},
            models: {}

        };

        return App;
    }
);
