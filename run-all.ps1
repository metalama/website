# Please DO NOT add the --incremental flag here. You can add it when you _call_ this script instead thanks to `@args`.
bundle exec jekyll serve --host 127.0.0.1 --port 8080 --drafts --unpublished --trace --strict_front_matter --config .\_config.yml,.\_config.local.yml @args 
