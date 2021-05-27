# velafrica-wpack-collectionevents
 
Built with https://wpack.io/

# Shortcode

    [velafrica-collectionevents]

Use this shortcode where you would like to display the collection events.    

# Requirements

- https://getcomposer.org/ 
- yarn
- docker

# Setup Docker Container

    ```bash
    docker-compose up -d && docker-compose logs -f wordpress
    ```

# Start development server

    yarn start

This will start the development server proxying your local WordPress server. Now you can have access to hot module replacement and live file watching. Just edit your files and see it live in the browser.

# Build Production files

    yarn build

Now create production builds with this single command. By default @wpackio/scripts will optimize build, minify output and create source-maps in different files.


# Create distributable zip file

    yarn archive

You may now want to create an installable .zip file for your theme or plugin. @wpackio/scripts makes it easy with one single command. Use it to readily deploy your plugin or theme to WordPress.org repository or to your server.
