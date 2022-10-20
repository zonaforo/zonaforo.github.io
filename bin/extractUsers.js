const fs = require("fs")
const BASE_FOLDER = __dirname + "/../public/api"
const POSTS_PER_PAGE = 15
const POSTS_PER_CHUNK = 100
String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const dirs = fs.readdirSync(BASE_FOLDER, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder != "users")

const users = []
for (let dir of dirs) {
    const folder = `${BASE_FOLDER}/${dir}`
    const chunks = fs.readdirSync(folder)

    for (let chunk of chunks) {
        console.log(`Processing ${folder}/${chunk}`)
        const content = JSON.parse(fs.readFileSync(`${folder}/${chunk}`))
        const chunkNo = parseInt(chunk.replace("chunk-", "").replace(".json", ""))

        content.posts.forEach((post, index) => {
            let user = users.find(x => x.name == post.author)
            if (user == undefined) {
                user = {
                    id: post.author.hashCode(),
                    name: post.author,
                    date: post.registrationDate,
                    messages: post.numMessages,
                    threads: [],
                    posts: []
                }
                users.push(user)
            }

            if (chunkNo == 1 && index == 0) {
                user.threads.push({
                    id: content.id,
                    title: content.title,
                    content: post.content,
                    date: post.publicationDate
                })
            } else {
                user.posts.push({
                    id: post.id,
                    thread: content.id,
                    title: content.title,
                    content: post.content,
                    date: post.publicationDate,
                    page: ((chunkNo - 1) * POSTS_PER_CHUNK) + Math.floor(index / POSTS_PER_PAGE) + 1
                })

            }
        })
    }
}

for (let user of users) {
    console.log(`Processing ${user.name}`)
    user.threads = user.threads.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    user.posts = user.posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    fs.writeFileSync(`${BASE_FOLDER}/users/${user.id}.json`, JSON.stringify(user))
}