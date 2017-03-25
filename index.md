## AjaxElementPaging knjižnica

## Nastavitve

```javascript
        var settings = $.extend({
		    //URL address for elements
		    url: ""
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
```


## HTML osnutek

```
<div class="example-class">
    <div class="wrapper">
    </div>
</div>


<script id="resultList" type="text/x-handlebars-template">
    <div class="ajax-elements">
        <div class="row">
            {{#each item1}}
				<div class="element">
					
				</div>
            {{/each}}
        </div>
    </div>

    <div class="ajax-pagination">
        <div class="current-info"></div>
        <ul class="pagination">
            <li class="firstButton">
                <a>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
            </li>

            <li class="prevButton">
                <a>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
            </li>

            {{#times item2  }}

            <li class="next-page">
                <a data-page={{this}}> {{this}} </a>
            </li>
            {{/times}}

            <li class="nextButton">
                <a>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
            </li>

            <li class="lastButton">
                <a>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
            </li>

        </ul>
        <button class="btn btn-default more-button">Get all button</button>
    </div>

</script>

```




## Site.js 

```
$(document).ready(function () {
	var resultElement = $(".example-class");

	if (resultElement.length)
    {
       resultElement.ajaxElementsPagination({
            url: "api/Example-elements",
            templateWithPaginationSelector: $("#resultList"),
            elementsResultElement: ".wrapper"
            numberOfItems: 10,
        });
    }
})

```



You can use the [editor on GitHub](https://github.com/bocman/ajaxElementsPaging/edit/master/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/bocman/ajaxElementsPaging/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
