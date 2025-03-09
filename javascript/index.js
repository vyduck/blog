import blogs from "./blogs.js";

const url = new URL(document.location.href);
const blogId = url.searchParams.get("id");
if (
    blogId == null ||
    blogId == "" ||
    isNaN(Number(blogId))
) {
    document.getElementsByTagName("header")[0].style.display = "block";
    document.getElementById("blog-body").style.display = "none";
    for (let blog of Object.values(blogs)) {
        const blogElement = document.createElement("a");
        blogElement.classList.add("blog-card");
        blogElement.setAttribute("href", document.location.href + `?id=${blog.id}`);

        const titleElement = document.createElement("p");
        titleElement.classList.add("blog-card-title");
        titleElement.innerText = blog.title;
        blogElement.appendChild(titleElement);

        const summaryElement = document.createElement("p");
        summaryElement.classList.add("blog-card-summary");
        summaryElement.innerText = blog.summary;
        blogElement.appendChild(summaryElement);

        const pubDateElement = document.createElement("p");
        pubDateElement.classList.add("blog-card-pub");
        pubDateElement.innerText = blog.pubDate;
        blogElement.appendChild(pubDateElement);

        document.getElementsByTagName("main")[0].appendChild(blogElement);
    }
} else {
    document.getElementsByTagName("header")[0].style.display = "none";
    document.getElementById("blog-body").style.display = "block";
    document.getElementById("blog-pub").innerHTML = blogs[blogId].pubDate;

    const converter = new showdown.Converter({
        customizedHeaderId: true,
        strikethrough: true,
        headerLevelStart: 2,
        tasklists: true
    });
    document.title = blogs[blogId].title + " | Vyankatesh Dande";
    fetch(blogs[blogId].url).then(data => {
        data.text().then(body => {
            document.getElementById("blog-content").innerHTML = converter.makeHtml(body);
        })
    })
}