## AjaxElementPaging knjižnica

## Nastavitve

```javascript
        var settings = $.extend({
            // Html element v katerega se bo preslikala vsebina prevedenega Handlebar template-a
            elementsResultElement: ".wrapper",
            // Od katerega elementa naprej se naj začne poizvedba
            start: 0,
            //Koliko elementov se naj vrne ob poizvedbi.
            numberOfItems: 10,
            // Število strani, od katerih naprej se naj pokažejo "pike" do zadnje strani
            showDotsAfter: null,
            // Selektor elementa, ki bo prikazoval trenutno stanje odprte strani
            currentInfoTextSelector: ".current-info",
            //Selektor od navigacijskih gumbov, brez nazaj, naprej ... samo navigacijski gumbi
            navButtonsSelector: ".pagination .next-page",
            //Ali želimo uporabljati naprej & nazaj gumba
            usePrevNextButtons: true,
			//Selektor gumba za prejšno stran
			prevButton: ".prevButton",
            // Selektor gumba za naslednjo stran
            nextButton: ".nextButton",
            //Ali uporabljamo gumba prva & zadnja stran
            useLastAndFirstButton: false,
            //Selektor gumba za prvo stran
            firstButtonSelector: ".firstButton",
            //Selektor gumba za zadnjo stran
            lastButtonSelector: ".lastButton",
            //Selektor od iskalnika (searchbox)
            searchBoxSelector: null,
            //url naslov za iskalnik, ki bo vrnil filtrirane zadetke
            searchUrl: null,
            // Ob iskanju se "zascrollaj" do elementsResultTemplate')
            scrollOnElementsAfterSearch: false

        }, options);
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
