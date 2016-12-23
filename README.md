# About docs-template

This project contains all the components needed to create a "static" documentation style website. "static" means that the content just requires a web server, and does not require a database.

`docs-template` includes sample content, styles, and navigation which you can customize to create your own documentation site.

# Get Started Making a New / Custom Site

To create a new, custom site based on `docs-template`, you start from an empty repository for your new project.

1. On your local system, start from the directory for the repository for your new site. Example:
```
git init --bare my-project
cd my-project
```
2. Add the `docs-template` as a remote. Example:
```
git remote add docs-template https://github.com/fluid-project/docs-template
```
3. Fetch and merge the contents of `docs-template` into your repository. This gives you a skeleton in which you can follow and modify to create a new site.
```
git fetch docs-template
git merge docs-template/master
```
Note: If your repository is initialized with a README.md file, you may have to resolve a conflict.
4. Install DocPad (if it isn't already installed):
```
sudo npm install -g docpad
```
5. Get the required node modules:
```
npm install
```
6. Run Grunt to copy some dependencies to their proper locations:
```
grunt
```
7. Run docpad:
```
docpad run
```
8. Confirm everything is set up properly by opening `http://localhost:9778/` in a web browser.

9. You can now customize the site.

10. Commit your changes to your new site's repository - not `docs-template` unless you intend to make changes to `docs-template`.

# Description of Some Important Files and Directories

The directory structure follows the organization typically found in DocPad projects. Visit http://docpad.org/docs/begin for more information.

```
./docpad.js                    Contains docpad configuration values.

./site-structure.json          Defines the sidebar Topics navigation
                               and the top-bar Category navigation. navigation
                               items appear on the website in the same order
                               defined in this file.

./src/documents/               Content files go in this directory. By default
                               content files can be written with HTML, markdown,
                               and handlebars.

                               Content files contain metadata which defines the
                               category, title, and layout. Category and title
                               map to the site-structure.json file.

./src/documents/css/           CSS files written in Stylus or native CSS go in
                               this directory.                               

./src/static/messages/         Text strings for the website. Customize this for
                               your site.

./src/gh-pages/                Files specific to github page deployment go in here.
                               Currently this contains the CNAME file.

./src/layouts/                 Layout templates for content are stored here.
                               default.html.handlebars is used for content.

./src/static/                  Static files such as fonts, images, PDFs and other
                               content go in here.
```

# Customizing Your Site

## Customizing Text Strings

To customize the text strings that appear by default on the website, edit the `messages.json` file located in the `./src/static/messages/` directory.  

## Customizing Styling

To customize the layout and styling of the website you should begin with the Stylus files located in the `./src/documents/css/` directory.

The following are styles you would probably want to customize for your website. Rather than modify these files directly, it is suggested you override the styles in different files and include those in your layout.

In particular:
```
./src/documents/css/docs-template.css.styl
    Contains the site styling and pulls in styling from files in the `includes/`
    directory. Rather than modify this file directly, it is recommended that you
    override the styles in different files and include those in your layout.

./src/documents/css/includes/category-colours.styl
    Contains styling for when a category is active. Refer to the
    `category-colours.styl` file for instructions on how to use this file.

./src/documents/css/includes/site-config.styl
    Contains all the other colour, focus, and border values used.
```

## Customizing Favicon, icons, and images

Images, icons, fonts, and the site's favicon can all be found within the `./src/static/` directory.

By default `docs-template` does not come with any site logos. It is expected that you provide your own and modify the template to display it properly.

## Customizing Layout

The site's layout is defined by a series of templates located in the `./layouts/` directory. The templates are written in HTML with handlebars.

The `404-page.html.handlebars` and `default.html.handlebars` are the main templates. Both these templates use the partials located in the `./layouts/partials/` directory.

Customizing the layout of your website will require modifying the main templates and the template partials.

# Getting Updates from docs-template for Your Custom Site

Periodically `docs-template` will have updates. It is up to you to decide whether to merge these changes to your project.

```
git fetch docs-template
git merge docs-template/master
npm update
```

Conflicts are expected to occur when merging in changes from `docs-template` to your custom site. Manually resolve each conflict.

# Deploy to GitHub Pages
```
docpad deploy-ghpages --env static
```

*Note:* The above command will deploy to the origin of the repository. To deploy to production, you may need to be working from Master, not a fork.

# Generating a Static version
To create a static version of the site, run: `docpad generate --env static`. This will generate a version in the `./out/` directory which you can then view locally or upload to a web server.

# Making Changes to docs-template
If you are making changes to the `docs-template`, you will need to update the version number in the `package.json` file to ensure cloned projects will receive their updates.

# License Information
The docs-template project is licensed under Creative Commons Attribution 3.0 - http://creativecommons.org/licenses/by/3.0/
