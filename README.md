jQuery Enhanced Form
====================

A clean jQuery plugin for rapid ajax form prototyping and more.

Bower Installation
-------------------

To install without declaring a dependency:

```console
bower install jquery-enhanced-form
```

If you want Bower to automatically add this dependency to your `bower.json`, just add `--save`:

```console
bower install --save jquery-enhanced-form
```

Or you can manually edit your `bower.json` to add the dependency:

```json
"dependencies": {
    "jquery-enhanced-form": "*"
}
```

Manual Installation
-------------------

The only dependency is jQuery. You just have to download it and use it.

```html
<script src="jquery.js"></script>
<script src="jquery.enhancedform.js"></script>
```

Latest jQuery version tested: `v1.10.1`


Basic Usage
-----------

The most common way of using Enhanced Form is activating its features in a certain form by id.

```html
<form id="my-form" action="some-action.php" method="post">
    
  <input type="text" name="title" />
    
  <textarea name="content"></textarea>
    
  <select name="category">
    <option value="1">News</option>
    <option value="2">Products</option>
  </select>
    
  <button type="submit">Send</button>
</form>

<script>
$('#my-form').enhancedform();
</script>
```

However, as one of its goodness is fast prototyping ajax forms in your app, it is better to use with a class or with `data-*` attributes:

```html
<form data-enhancedform action="some-action.php" method="post">
    
  <input type="text" name="title" />
    
  <textarea name="content"></textarea>
    
  <select name="category">
    <option value="1">News</option>
    <option value="2">Products</option>
  </select>
    
  <button type="submit">Send</button>
</form>

<script>
$('[data-enhancedform]').enhancedform();
</script>
```

Two things to notice here:

1. Don't worry with multiple forms in a page. The plugin will just take care of all the rest.
2. Enhanced Form __mimics__ what an ajax form would look like if it was a native implementation in HTML, using its default `action` and `method` attributes, you just have to worry about the HTML.

Options
-------

The main options for Enhanced Form are `action` and `method` attributes. If you have, for example, a URL that receives the ID of the object in a PUT operation, you could just do the following:

```html
<form data-enhancedform action="/user/666" method="put">
    ...
</form>
```

The same would happen with a DELETE operation and __any__ other method you'd like to use, and with the URL pattern you use:

```html
<form data-enhancedform action="/user/666" method="delete">
    Are you sure you want to delete user 666?
</form>
```
```html
<form data-enhancedform action="user.jsp?id=666" method="delete">
    Are you sure you want to delete user 666?
</form>
```

You can pass any argument of the following with `data-*` attributes as you would in `data-accepts="xml"`.

```javascript
// A function that executes while the form is submitting (expecting a function name)
waiting:function(){},
// Executes when obtained success in the request
done:function(data) {},
// Function for error handling
error:function() {},
// Function to execute everytime a request is finished
after:function(jqXhr, textStatus) {},
// The HTTP header "Accepts", defaults to json
accepts:'json',
// A JS Object mapping status codes
status: {
    // Status code examples
    403:function(){},
    404:function(){},
    500:function(){}
}
```

The option override order is the following (each one overrides the last one):

1. Use standard options
2. Use data-* attributes defined for this form
3. Use javascript arguments passed in the method call

Auto-saved forms
----------------

If you have really huge forms, or just a form that a user would spend a lot of time typing and reviewing (and losing data is not an option), you should try adding the `data-autosave` attribute: the form will wait until the user stops typing and saves it automatically.

The default timer is 2000 miliseconds (2 seconds), but this setting can be overriden by passing a `data-autosave-timer="1000"` attribute, specifying the time you want in miliseconds.

And now? [Disco](http://www.youtube.com/watch?v=wztTL7GNzFo).
