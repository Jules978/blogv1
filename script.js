//global variables
var xhr = new XMLHttpRequest();
var wordarray = []; //used by autofinish function in the test editor

//gets all articles from database
function getallposts(){ 
  document.getElementById("blog_row").innerHTML = ""; 
  
  var surl = "getmessages.php?action=read"; 
  xhr.open('GET', surl, false);
  var newblogposts=xhr.response; 
  xhr.send();
  
  var blogs_array = JSON.parse(xhr.response);
  
  //posting individual articles
  for (var post in blogs_array) { 
      if (blogs_array.hasOwnProperty(post)) {

        //create elements for full post, title, and content.
        var blog_date = blogs_array[post].date;
        var blog_category_text = blogs_array[post].name;
        var blog_date_category= blogs_array[post].date; 

        //create elements for full post, title, and content.
        var blogcard = document.createElement("div"); 
            blogcard.id = blogs_array[post].a_id;
            blogcard.className = 'card_blog';

        var blogcard_title = document.createElement("div") 
            blogcard_title.className = 'card_title';

        var blogcard_title_content = document.createElement("div")
            blogcard_title_content.className= "blog_title_line";

        var blogcard_category_content = document.createElement("div") 
            blogcard_category_content.className= "blog_category_line";

        var blogcard_content = document.createElement("div") 
            blogcard_content.className = 'card_content';

        //creates textnode with title, catagory, and text
        var blog_text = blogs_array[post].text; 
        var blog_title = document.createTextNode(blogs_array[post].title);
        var blog_category = document.createTextNode(blog_date_category);
      
        //adds text to corresponding elements
        blogcard_title_content.appendChild(blog_title);
        blogcard_title.appendChild(blogcard_title_content);
        blogcard_category_content.appendChild(blog_category);
        blogcard_title.appendChild(blogcard_category_content);
        blogcard_content.innerHTML = blog_text;
        
        //add elements to main blog div
        blogcard.appendChild(blogcard_title);
        blogcard.appendChild(blogcard_content);
        document.getElementById("blog_row").appendChild(blogcard);

        //create commentsection (with article id) if allowed
        if(blogs_array[post].disable_comments == "false"){

          var commentfield_id= "comments"+blogs_array[post].a_id;
          var comment_section_id= "commentsection"+blogs_array[post].a_id;
          var comment_input_id= "commentinput"+blogs_array[post].a_id;

          var commentsection = document.createElement("div");
              commentsection.className = "commentsection";
              commentsection.id= "commentsection_"+ blogcard.id;

    
          var comments = document.createElement("div");
              comments.id = commentfield_id;
          var commentlist=document.createElement("ul");
              commentlist.id = "commentlist_"+blogs_array[post].a_id;
              commentlist.className = "commentlist";
          
          //create comment form and see/send options
          var commentinput = document.createElement("div");
              
          var commenttext = document.createElement("input");
              commenttext.id = comment_input_id;
              commenttext.className = "comment_input";
              commenttext.setAttribute('type', 'text');
              commenttext.placeholder='Your comment';
          var commentsubmit = document.createElement("div");
              commentsubmit.id =  blogcard.id;
              commentsubmit.innerHTML="send comment";
              commentsubmit.className =  "send_comment";
              commentsubmit.onclick =  function() { submitcomment(this.id) };
          var seecomments = document.createElement("div");
              seecomments.id =  blogcard.id;
              seecomments.className =  "see_comments";
              seecomments.innerHTML="Show comments";
              seecomments.onclick =  function() { getcomments(this.id) };
          var removecommentsection = document.createElement("div");
              removecommentsection.id = blogcard.id;
              removecommentsection.className = "remove_commentsection";
              removecommentsection.onclick =  function() { disablecomments(this.id) };
              removecommentsection.innerHTML="Remove commentsection";

              //add comment elements to  blogcard
              commentsection.appendChild(seecomments);
              commentinput.appendChild(commenttext);
              commentinput.appendChild(commentsubmit);
              comments.appendChild(commentlist);
              commentsection.appendChild(comments);
              commentsection.appendChild(commentinput);
              commentsection.appendChild(removecommentsection);
              blogcard.appendChild(commentsection);
        }
      }
  }
};

//gets the newest 2 messages from all catagories  
function getfiveposts(){ 
  document.getElementById("blog_row").innerHTML = ""; //clears blog div
  
  var surl = "getmessages.php?action=read"; 
  xhr.open('GET', surl, false);
  xhr.send();

  var newblogposts=xhr.response; 
  var blogs_array = JSON.parse(xhr.response);
  var blogs_array_firstfive = blogs_array .slice(0, 2); //slices array so only the frist five objects are used
  
  //posting individual articles
  for (var post in blogs_array_firstfive) { 
       if (blogs_array_firstfive.hasOwnProperty(post)) {
        var blog_date = blogs_array[post].date;
        var blog_category_text = blogs_array[post].name;
        var blog_date_category= blogs_array[post].date; //+ ", in " + blog_category_text
        
        //create elements for full post, title, and content.
        var blogcard = document.createElement("div"); 
            blogcard.id = blogs_array[post].a_id;
            blogcard.className = 'card_blog';
        var blogcard_title = document.createElement("div") 
            blogcard_title.className = 'card_title';
        var blogcard_title_content = document.createElement("div")
            blogcard_title_content.className= "blog_title_line";
        var blogcard_category_content = document.createElement("div") 
            blogcard_category_content.className= "blog_category_line";
        var blogcard_content = document.createElement("div") 
            blogcard_content.className = 'card_content';

        //creates textnode with title, catagory, and text
        var blog_text = blogs_array[post].text; 
        var blog_title = document.createTextNode(blogs_array[post].title);
        var blog_category = document.createTextNode(blog_date_category);
      
        //adds textnodes to corresponding elements
        blogcard_title_content.appendChild(blog_title);
        blogcard_title.appendChild(blogcard_title_content);
        blogcard_category_content.appendChild(blog_category);
        blogcard_title.appendChild(blogcard_category_content);
        blogcard_content.innerHTML = blog_text;
        
        //add elements to main blog div
        blogcard.appendChild(blogcard_title);
        blogcard.appendChild(blogcard_content);
        document.getElementById("blog_row").appendChild(blogcard);

        //create commentsection (with article id) if allowed
        if(blogs_array[post].disable_comments == "false"){
            var commentfield_id= "comments"+blogs_array[post].a_id;
            var comment_section_id= "commentsection"+blogs_array[post].a_id;
            var comment_input_id= "commentinput"+blogs_array[post].a_id;
            
            var commentsection = document.createElement("div");
                commentsection.className = "commentsection";
                commentsection.id= "commentsection_"+ blogcard.id;
            
            var comments = document.createElement("div");
                comments.id = commentfield_id;
            var commentlist=document.createElement("ul");
                commentlist.id = "commentlist_"+blogs_array[post].a_id;
                commentlist.className = "commentlist";

             //create comment form and see/send options
            var commentinput = document.createElement("div");
            var commenttext = document.createElement("input");
                commenttext.id = comment_input_id;
                commenttext.className = "comment_input";
                commenttext.setAttribute('type', 'text');
                commenttext.placeholder='Your comment';
            var commentsubmit = document.createElement("div");
                commentsubmit.id =  blogcard.id;
                commentsubmit.className = "send_comment";
                commentsubmit.innerHTML="send comment";
                commentsubmit.onclick =  function() { submitcomment(this.id) };
            var seecomments = document.createElement("div");
                seecomments.id = blogcard.id;
                seecomments.className = "see_comments";
                seecomments.innerHTML="Show comments";
                seecomments.onclick =  function() { getcomments(this.id) };
            var removecommentsection = document.createElement("div");
                removecommentsection.id = blogcard.id;
                removecommentsection.className = "remove_commentsection";
                removecommentsection.onclick =  function() { disablecomments(this.id) };
                removecommentsection.innerHTML="Remove commentsection";   
              
            //add comment elements to  blogcard
            commentsection.appendChild(seecomments);
            commentinput.appendChild(commenttext);
            commentinput.appendChild(commentsubmit);
            comments.appendChild(seecomments);
            comments.appendChild(commentlist);
            commentsection.appendChild(comments);
            commentsection.appendChild(commentinput);
             commentsection.appendChild(removecommentsection);
            blogcard.appendChild(commentsection);
        }
      }
  }
};

  
//get all messages in selected catagory
function sortbycategory(category){ 
  document.getElementById("blog_row").innerHTML = ""; //clear blog div
  var surl = "getmessages.php?action=sort&category=" + category ; 

  xhr.open('GET', surl, false);
  var newblogposts=xhr.response; 
  xhr.send();
  var blogs_array = JSON.parse(xhr.response);
  
  //posting individual articles
  for (var post in blogs_array) {
       if (blogs_array.hasOwnProperty(post)) {
        
        var blog_date = blogs_array[post].date;
        var blog_category_text = blogs_array[post].name;
        var blog_date_category= blogs_array[post].date; //+ ", in " + blog_category_text
      
        //create elements for full post, title, and content.
        var blogcard = document.createElement("div"); 
            blogcard.id = blogs_array[post].a_id;
            blogcard.className = 'card_blog';
        var blogcard_title = document.createElement("div") 
            blogcard_title.className = 'card_title';
        var blogcard_title_content = document.createElement("div")
            blogcard_title_content.className= "blog_title_line";
        var blogcard_category_content = document.createElement("div") 
            blogcard_category_content.className= "blog_category_line";
        var blogcard_content = document.createElement("div") 
          blogcard_content.className = 'card_content';

        //creates textnode with title, catagory, and text
        var blog_text = blogs_array[post].text; 
        var blog_title = document.createTextNode(blogs_array[post].title);
        var blog_category = document.createTextNode(blog_date_category);
      
        //adds textnodes to corresponding elements
        blogcard_title_content.appendChild(blog_title);
        blogcard_title.appendChild(blogcard_title_content);
        blogcard_category_content.appendChild(blog_category);
        blogcard_title.appendChild(blogcard_category_content);
        blogcard_content.innerHTML = blog_text;
        
        //add elements to main blog div
        blogcard.appendChild(blogcard_title);
        blogcard.appendChild(blogcard_content);
        document.getElementById("blog_row").appendChild(blogcard);
        
        ///create commentsection (with article id) if allowed
        if(blogs_array[post].disable_comments == "false"){
            var commentfield_id= "comments"+blogs_array[post].a_id;
            var comment_section_id= "commentsection"+blogs_array[post].a_id;
            var comment_input_id= "commentinput"+blogs_array[post].a_id;

            var commentsection = document.createElement("div");
                commentsection.className = "commentsection";
                commentsection.id= "commentsection_"+ blogcard.id;
            var comments = document.createElement("div");
                comments.id = commentfield_id;
            var commentlist=document.createElement("ul");
                commentlist.id = "commentlist_"+blogs_array[post].a_id;
                commentlist.className = "commentlist";
             
            //create comment form and see/send options
            var commentinput = document.createElement("div");
            var commenttext = document.createElement("input");
                commenttext.id = comment_input_id;
                commenttext.className = "comment_input";
                commenttext.setAttribute('type', 'text');
                commenttext.placeholder='Your comment';
            var commentsubmit = document.createElement("div");
                commentsubmit.id =  blogcard.id;
                commentsubmit.className =  "send_comment";
                commentsubmit.innerHTML="send comment";
                commentsubmit.onclick =  function() { submitcomment(this.id) };
            var seecomments = document.createElement("div");
                seecomments.id =  blogcard.id;
                seecomments.className = "see_comments";
                seecomments.innerHTML="Show comments";
                seecomments.onclick =  function() { getcomments(this.id) };
            var removecommentsection = document.createElement("div");
                removecommentsection.id = blogcard.id;
                removecommentsection.className = "remove_commentsection";
                removecommentsection.onclick =  function() { disablecomments(this.id) };
                removecommentsection.innerHTML="Remove commentsection";   

                //add comment elements to  blogcard
                commentsection.appendChild(seecomments);
                commentinput.appendChild(commenttext);
                commentinput.appendChild(commentsubmit);
                comments.appendChild(commentlist);
                commentsection.appendChild(comments);
                commentsection.appendChild(commentinput);
                commentsection.appendChild(removecommentsection);
                blogcard.appendChild(commentsection);
            }
      }
  } 
};

//load nav bar and side bar categories
function loadcategories(){
  var surl = "getmessages.php?action=cat"; 
  
  xhr.open('GET', surl, false);
  xhr.send();
  var category_array = JSON.parse(xhr.response);
  
  //create category elements
  for (var cat in category_array) {
       if (category_array.hasOwnProperty(cat)) {  
        var category_name = category_array[cat].name;
        var category_id = category_array[cat].c_id;
                
        //adding categories to sidebar
        var category_bar = document.createElement("div"); 
            category_bar.className = 'sidebar_category';
            category_bar.id = category_id;
            category_bar.onclick =  function() { sortbycategory(this.id) };
        var category_bar_text = document.createElement("p");
            category_bar_text.innerHTML = category_name;
            category_bar.appendChild(category_bar_text);
        var sidebar_menu = document.getElementById("card_categories");  
            sidebar_menu.appendChild(category_bar);

        //adding categories to navbar
        var category_nav = document.createElement("a"); 
            category_nav.id = category_id;
            category_nav.onclick =  function() { sortbycategory(this.id) };
            category_nav.innerHTML = category_name;
        var navbar_menu = document.getElementById("dropdown_category");  
            navbar_menu.appendChild(category_nav);

        //adding categories to selection menu
        var category_option = document.createElement("option"); 
            category_option.value = category_id;
            category_option.innerhtml = category_name;
        var category_select = document.getElementById("categories_input");  
       }
    }
};



//submit new comment 
function submitcomment(sectionid){
  var articleid=sectionid;
  var comment_input_id = "commentinput"+sectionid;
  var int_sectionid = parseInt(sectionid);
  var msg = document.getElementById(comment_input_id).value;
  var url= "message="+ msg +"&sectionid="+ int_sectionid;  
  
  xhr.open("POST","comments.php", true); //POST request
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
  xhr.send(url); 
  document.getElementById(comment_input_id).value = '';
  getcomments(articleid); //automatically reload comment section
} 

//load comment section
function getcomments(sectionid){
  var comment_input_id = "commentinput"+sectionid;
  var int_sectionid = parseInt(sectionid);
  var commentsectionlist = document.getElementById("commentlist_"+int_sectionid);
  while (commentsectionlist.firstChild) { //clears ul element
    commentsectionlist.removeChild(commentsectionlist.firstChild);
  };

  var url= "comments.php?action=read&sectionid="+ int_sectionid;  
  xhr.open("GET",url, false); 
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
  xhr.send(url); 
  var comments_array = JSON.parse(xhr.response);
  
  //load individual comments
  for (var com in comments_array) {
    var commentid = comments_array[com].comment_id;
    var commenttext = comments_array[com].comment;
    var articleid = comments_array[com].article_id;
    var commentlist = document.getElementById("commentlist_"+articleid);
    var comment_item = document.createElement("li"); 
        comment_item.id = "comment_"+commentid;
        comment_item.className = "comment";
        comment_item.innerHTML = commenttext;
        commentlist.appendChild(comment_item);
  }
}





