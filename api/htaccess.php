<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

RedirectMatch 301 ^/courses$ /courses/index.html
RedirectMatch 301 ^/courses/$ /courses/index.html

RewriteRule ^courses/level/([0-9a-zA-Z-_]*)/$ ./courses/level/[slug]/index.html?slug=$1 [L]
RewriteRule ^courses/level/([0-9a-zA-Z-_]*)$ ./courses/level/[slug]/index.html?slug=$1 [L]

RewriteRule ^courses/module/([0-9]*)/$ ./courses/module/[id]/index.html?id=$1 [L]
RewriteRule ^courses/module/([0-9]*)$ ./courses/module/[id]/index.html?id=$1 [L]

RewriteRule ^module-quiz/([0-9]*)/$ ./module-quiz/[module]/index.html?module=$1 [L]
RewriteRule ^module-quiz/([0-9]*)$ ./module-quiz/[module]/index.html?module=$1 [L]

RewriteRule ^courses/([0-9a-zA-Z-_]*)/$ ./courses/[course]/index.html?course=$1 [L]
RewriteRule ^courses/([0-9a-zA-Z-_]*)$ ./courses/[course]/index.html?course=$1 [L]

RewriteRule ^courses/([0-9a-zA-Z-_]*)/([0-9a-zA-Z-_]*)/$ ./courses/[course]/[slug]/index.html?course=$1&slug=$2 [L]
RewriteRule ^courses/([0-9a-zA-Z-_]*)/([0-9a-zA-Z-_]*)$ ./courses/[course]/[slug]/index.html?course=$1&slug=$2 [L]

# RewriteRule ^exercises/module/([0-9]*)/$ ./courses/module/[id]/index.html?id=$1 [L]
# RewriteRule ^exercises/module/([0-9]*)$ ./courses/module/[id]/index.html?id=$1 [L]

RewriteRule ^quizzes/([0-9a-zA-Z-_]*)/$ ./quizzes/[course]/index.html?course=$1 [L]
RewriteRule ^quizzes/([0-9a-zA-Z-_]*)$ ./quizzes/[course]/index.html?course=$1 [L]

RewriteRule ^certifications/([0-9a-zA-Z-_]*)/$ ./certifications/[course]/index.html?course=$1 [L]
RewriteRule ^certifications/([0-9a-zA-Z-_]*)$ ./certifications/[course]/index.html?course=$1 [L]

#  Redirect courses/ courses/index.html
</IfModule>
