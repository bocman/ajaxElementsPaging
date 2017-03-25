var Handlebars = require('handlebars');

(function ($) {

    Handlebars.registerHelper('times', function (n, block) {
        var accum = '';
        for (var i = 1; i <= n; ++i)
            accum += block.fn(i);
        return accum;
    });

    $.fn.ajaxElementsPagination = function (options) {

        var settings = $.extend({
            //Elements where result will be showed ( script template)
            elementsResultElement: ".wrapper",
            // These are the defaults.
            start: 0,
            //How many items we would like to get from api request
            numberOfItems: 10,
            //Show dost after this number of navigation buttons
            showDotsAfter: null,
            //Info text, which show us how many pages are left
            currentInfoTextSelector: ".current-info",
            //Selector of navigations elements (without previous, next ..., only numbers of pages )
            navButtonsSelector: ".pagination .next-page",
            //Use previous and next button
            usePrevNextButtons: true,
            //Are you using first/last buttons on page?
            useFirstLastButtons: true,
            // Selector of previous button
            prevButton: ".prevButton",
            // Selector of next button
            nextButton: ".nextButton",
            //Selector of first page button
            firstButtonSelector: ".firstButton",
            //Selector of the last page button element
            lastButtonSelector: ".lastButton",
            //Do you wanna use last and first button functionality?
            useLastAndFirstButton: false,
            //Selector of searchbox element ( it should contain input and span with icon)
            searchBoxSelector: null,
            //URl address which return as filtered items in relation with our query
            searchUrl: null,
            //Do you wanna to automaticly scroll on elements after submiting search string?
            scrollOnElementsAfterSearch: false

        }, options);

        settings = $.extend(settings, options);

        var self = this;
        this.wrapper = $(this).find(settings.elementsResultElement);
        this.template = settings.templateWithPaginationSelector.html();
        this.paginationButtons = settings.templateWithPaginationSelector.find(settings.navButtonsSelector);
        this.templateScript = Handlebars.compile(this.template);
        this.templateScript2 = Handlebars.compile(this.template);
        this.selected = null;
        this.pageNumber = 1;


        this.scrollOnElement = function(selector) {
            $('html, body').animate({
                scrollTop: $(selector).offset().top
            }, 2000);
        }

        this.showDotsBetween = function (navItems, endLimit) {
            if (settings.showDotsAfter == null)
                return

            if (navItems.length >= settings.showDotsAfter) {
                navItems.slice(self.pageNumber + settings.showDotsAfter - 1, endLimit).hide();
                if ((self.pageNumber - 1) <= endLimit - 3) {
                    navItems.last().before("<li class='next-page seperator' style='display:inline-block !important'><a data-page='8' style='border: none;'> ... </a> </li>")
                    navItems.slice(0, self.pageNumber - 1).hide();
                }
                else {
                    navItems.slice(0, (endLimit - settings.showDotsAfter+1)).hide();
                }
            }
        }

        this.currentInfoText = function (lastIndex) {
            if (lastIndex > 0) {
                var element = $(settings.currentInfoTextSelector);
                if (element.length) {
                    element.text("Stran " + self.pageNumber + " od " + lastIndex);
                }
            }
        }

        this.search = function (parentObject) {
            var searchBox = $(settings.searchBoxSelector);
            if (searchBox.length) {
                var parent = this;
                this.inputField = searchBox.find("input");
                this.searchButton = searchBox.find("span");

                this.search = function () {
                    var queryValue = parent.inputField.val();

                    var paramsStart = 0;

                    if (self.pageNumber == 1)
                        paramsStart = settings.start;               
                    else
                        paramsStart = (self.pageNumber - 1) * settings.numberOfItems;

                    $.get(settings.searchUrl,
                            {
                                "query": queryValue,
                                "start": 1,
                                "numberOfItems": settings.numberOfItems
                            },
                            function (data) {
                            })
                         .done(function (data) {
                             self.wrapper.html(self.templateScript2(data));
                             var items = self.wrapper.find(settings.navButtonsSelector);

                             self.pageNumber = 1;
                             self.selected = self.wrapper.find('*[data-page="' + self.pageNumber + '"]');
                             self.selected.parent().addClass("active");
                             self.showDotsBetween(items, lastIndex - 1)
                             pagingEvent(parentObject, items, true, queryValue);
                             var lastButton = self.wrapper.find(settings.navButtonsSelector).last();
                             var lastIndex = lastButton.find("a").data("page");
                             self.currentInfoText(lastIndex);

                             if (self.pageNumber == 1)
                                 $(settings.prevButton).css({ "visibility": "hidden" });
                             if (self.pageNumber == lastIndex)
                                 $(settings.nextButton).css({ "visibility": "hidden" });

                             if (data.item1.length == 0) {
                                 self.wrapper.find(settings.navButtonsSelector).hide();
                             }
                         });
                };

                this.searchButton.click(function () {
                    parent.search();
                    if (settings.scrollOnElementsAfterSearch) {
                        self.scrollOnElement(settings.elementsResultElement)
                    }
                });

                this.inputField.keypress(function (event) {
                    if (event.keyCode == 13) {
                        parent.search();
                 
                        if (settings.scrollOnElementsAfterSearch) {
                            self.scrollOnElement(settings.elementsResultElement)
                        }
                    }
                });

            }
        }

        function pagingEvent(parent, pagination, isSearch, queryValue) {

            function refresh(parentObject) {
                var lastButton = self.wrapper.find(settings.navButtonsSelector).last();
                var lastIndex = lastButton.find("a").data("page");
                var paramsStart = settings.start;;

                if (self.pageNumber > 1)
                    paramsStart = (self.pageNumber - 1) * settings.numberOfItems;

                var url = settings.url;
                var params = {
                    "start": paramsStart,
                    "numberOfItems": settings.numberOfItems
                };

                if (isSearch) {
                    url = settings.searchUrl;
                    params.query = queryValue;
                    }

                $.get(url,
                        params,
                        function (data) {
                        })
                     .done(function (data) {
                         self.wrapper.html(self.templateScript2(data));
                         var items = self.wrapper.find(settings.navButtonsSelector);
                         self.selected = self.wrapper.find('*[data-page="' + self.pageNumber + '"]');
                         self.selected.parent().addClass("active");
                         self.showDotsBetween(items, lastIndex - 1)
                         pagingEvent(parentObject, items, isSearch, queryValue);

                         self.currentInfoText(lastIndex);

                         if (self.pageNumber == 1)
                             $(settings.prevButton).css({ "visibility": "hidden" });
                         if (self.pageNumber == lastIndex)
                             $(settings.nextButton).css({ "visibility": "hidden" });
                     });
            }

            pagination.click(function () {
                self.pageNumber = $(this).find("a").data("page");
                refresh(this);
            });

            if (settings.useLastAndFirstButton) {
                $(settings.firstButtonSelector).click(function () {
                    var items = self.wrapper.find(settings.navButtonsSelector);
                    if (items.length > 0) {
                        self.pageNumber = 1;
                        refresh(this);
                        $(settings.prevButtonSelector).css({ "visibility": "hidden" });
                    }
                });

                $(settings.lastButtonSelector).click(function () {
                    var lastButton = self.wrapper.find(settings.navButtonsSelector).last();
                    var lastIndex = lastButton.find("a").data("page");

                    if (lastIndex > 0) {
                        self.pageNumber = lastIndex;
                        refresh(this);
                        $(settings.nextButtonSelector).css({ "visibility": "hidden" });
                    }
                });
            }
            else {
                //IF user not choose to use First and Last button, we simple hide them
                var first = $(settings.firstButtonSelector);
                var last = $(settings.lastButtonSelector);
                if (first.length) {
                    first.hide();
                }
                if (last.length) {
                    last.hide();
                }
            }

            $(settings.prevButton).click(function () {
                if (self.pageNumber > 1) {
                    self.pageNumber--;
                    refresh(this);
                }
                if (self.pageNumber == 1)
                    $(this).css({ "visibility": "hidden" });
            });

            $(settings.nextButton).click(function () {
                var lastButton = self.wrapper.find(settings.navButtonsSelector).last();
                var lastIndex = lastButton.find("a").data("page");

                if (self.pageNumber < lastIndex) {
                    self.pageNumber++;
                    refresh(this);
                }
                else {
                    $(this).css({ "visibility": "hidden" });
                }
                if (self.pageNumber + 1 == self.lastIndex)
                    $(this).css({ "visibility": "hidden" });
            });

        }

        this.loadData = function () {
         
            $.get(settings.url,
                {
                    "start": settings.start,
                    "numberOfItems": settings.numberOfItems
                },
                function (data) {
                })
                .done(function (data) {
                    var html = self.templateScript(data);
                    self.wrapper.html(html)

                    var lastButton = self.wrapper.find(settings.navButtonsSelector).last();
                    var lastIndex = lastButton.find("a").data("page");

                    var paginations = self.wrapper.find(settings.navButtonsSelector);                  
                    self.showDotsBetween(paginations, lastIndex-1)
                    paginations.first().addClass("active");
                    pagingEvent(parent, paginations);
                    self.currentInfoText(lastIndex);
                    $(settings.prevButton).css({ "visibility": "hidden" });

                    self.search(this);
                });
        }

        if (this.wrapper.length) {
            this.loadData();
        }
    };
}(jQuery));
