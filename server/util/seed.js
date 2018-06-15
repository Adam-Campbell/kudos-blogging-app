const mongoose = require('mongoose');
const User = require('../api/user/userModel');
const Post = require('../api/post/postModel');
const Comment = require('../api/comment/commentModel');
const Follow = require('../api/follow/followModel');
const Highlight = require('../api/highlight/highlightModel');
const Kudos = require('../api/kudos/kudosModel');
const logger = require('./logger');
const config = require('../config/config');


async function seedTestDB() {
    logger.log('Clearing the Database...');
    // Clear the DB
    const modelArr = [User, Post, Comment, Follow, Highlight, Kudos]
    .map(model => model.remove().exec());
    await Promise.all(modelArr);

    logger.log('Seeding the Database...');
    logger.log('Creating users...');
    // Create the users
    const createAdam = new User({ username: 'adam campbell', password: 'test', email: 'adamcampbelldev@gmail.com', avatar: `${config.staticUrl}adam-profile.jpeg`, bio: "I made this!!1!" }).save();
    const createAndrea = new User({username: 'andrea white', password: 'password', email: 'test@test.co.uk', avatar: `${config.staticUrl}andrea-profile.jpg`, bio: "Hi I'm Andrea!"}).save();
    const createMark = new User({username: 'mark ericson', password: 'uwontguessthis', email: 'mark@test.net', avatar: `${config.staticUrl}mark-profile.jpg`, bio: "My name is Mark"}).save();
    const createRebecca = new User({username: 'rebecca headley', password: 'rhead1991', email: 'bex@test.info', avatar: `${config.staticUrl}rebecca-profile.jpg`, bio: "Rebecca is my name!"}).save();
    const createDivon = new User({username: 'divon dyers', password: 'stayout123', email: 'divon@test.gov', avatar: `${config.staticUrl}divon-profile.jpg`, bio: "Hi I am Divon!"}).save();
    const createAmelia = new User({username: 'amelia smith', password: 'safeashouses321', email: 'amelia@test.co', avatar: `${config.staticUrl}amelia-profile.jpg`, bio: "Amelia here!"}).save();
    const createTyrion = new User({username: 'tyrion lannister', password: 'alwayspaymydebts99', email: 'tyrion@dragonstone.com', avatar: `${config.staticUrl}tyrion-profile.jpg`, bio: "I drink and I know things."}).save();
    const createObara = new User({username: 'obara sand', password: 'sandsneksrule26', email: 'obara@dorne.com', avatar: `${config.staticUrl}obara-profile.jpg`, bio: "REEEEEEEE"}).save();
    const createLogen = new User({username: 'logen ninefingers', password: 'thebloody9', email: 'logen@thenorth.com', avatar: `${config.staticUrl}logen-profile.jpg`, bio: "You have to be realistic about these things."}).save();
    const createMonza = new User({username: 'monza murcatto', password: 'thisis4benna', email: 'thesnake@talins.com', avatar: `${config.staticUrl}monza-profile.jpg`, bio: "This is for Benna!"}).save();
    const createUhtred = new User({username: 'uhtred ragnarson', password: 's0n0fuhtred', email: 'uhtred@bebbanburg.com', avatar: `${config.staticUrl}uhtred-profile.jpg`, bio: "Destiny is all."}).save();
    const createYennefer = new User({username: 'yennefer of vengerberg', password: 'uglyduckling6', email: 'yen@vengerberg.com', avatar: `${config.staticUrl}yennefer-profile.jpg`, bio: "Welcome, my dear friends."}).save();
    const createWilliam = new User({username: 'william wallace', password: '3dom', email: 'will@thehighlands.com', avatar: `${config.staticUrl}william-profile.jpg`, bio: "Freedom!!"}).save();
    const createJeanne = new User({username: 'jeanne de clisson', password: 'lioness63', email: 'jeanne@brittany.com', avatar: `${config.staticUrl}jeanne-profile.jpg`, bio: "Yes it's all true!"}).save();
    const createMaximus = new User({username: 'maximus desmus meridius', password: 'gladi8or', email: 'maximus@thearena.com', avatar: `${config.staticUrl}maximus-profile.jpg`, bio: "What we do in life echoes in eternity."}).save();
    
    
    const adam = await createAdam;
    const andrea = await createAndrea;
    const mark = await createMark;
    const rebecca = await createRebecca;
    const divon = await createDivon;
    const amelia = await createAmelia;
    const tyrion = await createTyrion;
    const obara = await createObara;
    const logen = await createLogen;
    const monza = await createMonza;
    const uhtred = await createUhtred;
    const yennefer = await createYennefer;
    const william = await createWilliam;
    const jeanne = await createJeanne;
    const maximus = await createMaximus;
    
    /*
    logger.log('Creating posts...');

    const createBase64Post = new Post({
        title: 'Storing images as Base64 string vs binary data in MongoDB using NodeJS.', 
        text: `I am working on developing a locally hosted web application. There is a form with a few image file upload fields. Now, I would like to store the images that user selects to the MongoDB when the form is submitted. Then a batch operation would convert all data and store it in files (images will be stored as is and form fields will be stored in a text file). I am a little confused if I should store it as base64 string or binary data.

        There is supposed to be constraint on the maximum size of an image (say, 50kb). So during the batch operation I would not like that if user originally uploaded an image of say 49kb it got inflated to 55kb somehow. Basically I would want the image to be unchanged in all respects.
        
        Queries:
        
        ◘ Do any of these methods result in any loss of data?
        ◘ Is bas64 string unique for every image?
        ◘ I read somewhere that decoding base64 string actually renders an image that occupies more memory than the original one, is this true?`,
        author: adam._id,
        category: 'javascript',
        description: 'Wherein we examine the optimal way for storing an image in a Mongo database.',
        image: `${config.staticUrl}base64-post-image.jpg`
    }).save();

    const createSelfPubPost = new Post({
        title: 'Is the new self publishing revolution good or bad for the fantasy genre?',
        text: `I have read a couple of fantasy gems that have come from self-publishing (Blood Song... actually Blood Song is the only one I can think of), but I feel like it's opened up a floodgate of trashy books. While I think it's great that authors have the chance to get their books out there without massive publishers, I also think that having to go through massive publishers is a good filter for a lot of the not so great stuff.

        I'm trying to find stuff to read, but I all I can find are $0.99 ebooks titled things like "Super Battle Mage Dark Blood" and the such. Anyone else feel this way or am I just a heartless cynic crushing the life out of the fantasy community?
        
        Edit: I realize that a lot of people on this subreddit are self-published authors or on their way to becoming one, and I am in no way saying your book is trash. I haven't actually read that much self-published stuff, but from what little I have read it just seems to me that there's a lot of subpar stuff.
        
        Edit 2: Hey guys, so the actual purpose of this thread was to get a feel for the general perception of self-published work in fantasy/sci-fi readers for a potential project. I actually would agree that self-publishing is a good thing, but I find that playing the devil's advocate and arguing for the side I'm against gives me a more balanced view of things. If any of you have time, I started a new thread with some actual specific questions, and I'd really appreciate any feedback. If not, thanks for any contributions you've made here there's already a lot of useful info!`,
        author: amelia._id,
        category: 'fantasy',
        description: 'An analysis of the impact that the meteoric rise of self publishing has had on the fantasy genre.',
        image: `${config.staticUrl}self-pub-post-image.jpg`
    }).save();

    const createCP2020Post = new Post({
        title: 'How would you feel about a Dragon Age: Origin style opening?', 
        text: `I've been thinking about how they will incorporate classes/roles into the game, and one thing I keep coming back to that it wouldn't make sense for each class to start the game under the same circumstances. A cop versus a nomad versus a rockerboy, for instance, would all likely live and work in very different places and under different circumstances.

        The best way around this that I have come up with is to have the first portion of the game vary depending on your class. Ideally these "prologues" would be a bit longer than the ones in DA:O, but the concept is basically the same.
        
        Obviously, a developer can't have the entire story change massively depending on your class, but using a DA:O style opening seems like one way to ensure the class differences feel meaningful and emphasize the very different background for each. Obviously, you'd also have skill differences and unique dialog or alternate ways to complete/advance quests. This wouldn't be the only difference between them...just a nice way to emphasize those differences.
        
        Thoughts on this approach?`,
        author: rebecca._id,
        category: 'games',
        description: 'Some thoughts about the possibility of having DA:O style origins for each of the available classes in CyberPunk2020.',
        image: `${config.staticUrl}cyberpunk-post-image.jpg`
    }).save();
    
    const createPrettierPost = new Post({
        title: `I don't like prettier`, 
        text: `It seems like prettier is becoming very popular. https://github.com/prettier/prettier

        I don't like it. I don't like the whole "rewrite from AST" approach. I prefer a formatter with a lighter touch, that fixes a my mistakes, but also trusts me.
        
        Yes, wrap that long line. But no, don't unwrap those short lines, I did that on purpose. Or I wanted an extra new line there. Or these variables are a matrix, don't reformat them, and don't make me add an ugly comment to turn you off.
        
        I'm starting to feel like I'm alone in this though, that there's a pro-prettier movement, but not an anti-prettier movement (or a pro some-other-tool movement).
        
        Anyone feel the same way? What tools do you use instead, if any? How do you deal with teammates pressuring you to use prettier?`,
        author: andrea._id,
        category: 'javascript',
        description: 'Just venting my frustration about this new prettier thing all the cool kids are using.',
        image: `${config.staticUrl}prettier-post-image.jpg`
    }).save();

    const createReviewPost = new Post({
        title: `The Poppy War book review`, 
        text: `So, I finished this about a week and a half ago and I had to sit and percolate on this one before gathering my thoughts to write a proper review. This book devastated me, y’all.

        The Poppy War by R.F. Kuang is a fantasy story that is a bit coming of age, and a lot military fantasy dealing with the harsh reality of war. Rin is a young girl from the country with little prospects. A war orphan, she’s been raised by guardians that are eager to marry her off in order to help their business. Vehemently opposed to this plan, Rin becomes determined to study so she can score high enough on the test to be admitted into the country’s most elite military academy, Sinegard. Once there she learns her path ahead will be tough–she’ll be ostracized by her fellow students and even some of the teachers. One of the only people to believe in her will be an eccentric teacher that isa a master of the ancient and mostly defunct art of shamanism. Meanwhile, the tentative peace between Rin’s homeland of Nikara and their old foe, the Federation of Mugen, begins to waver. Soon the peace will be shattered altogether and Rin and her schoolmates will be faced with the harsh realities of war.
        
        I feel like I can’t say that I enjoyed this book entirely because if I do then people may begin to question my sanity–because this book goes to some very, very, very dark places. But, I did like this book, very much, and I respect it because it doesn’t hold anything back and goes right into the heart of nightmares. The thing is, if you know the history that a lot of this is based on, specifically the second Sino-Japanese war and certain events therein, then it makes those sections of the book even more of an uncomfortable read. Because it’s not just fantasy ultra-violence for the sake of ultra-violence the way some grimdark can be…it’s uncomfortable because the atrocities written on the pages in this book are pulled right from human history. This book is a stark reminder of the human capacity for violence and what can happen when some people refuse to see other people as fellow human beings.

        Overall, The Poppy War was quite a reading experience for me. I don’t think it’s going to be a book that I can recommend to everyone but it’s definitely going to stick with me for a while and continue to make me think. 5/5 stars.`,
        author: obara._id,
        category: 'fantasy',
        description: "My review of 'The Poppy War' by R.F. Kuang.",
        image: `${config.staticUrl}book-review-post-image.jpg`
    }).save();

    const createWitcherPost = new Post({
        title: `Happy Belleteyn`, 
        text: `Happy Belleteyn everyone !

        TIL that this was actually a thing for real since it´s an old pagan ritual. And I always loved the small episodes in the books.`,
        author: adam._id,
        category: 'fantasy',
        description: 'Wishing you all a happy Belleteyn!',
        image: `${config.staticUrl}belleteyn-post-image.jpg`
    }).save();

    const createLearnModernJavaScriptPost = new Post({
        title: 'Where to start learning about modern javascript?', 
        text: `Hi guys, i'm a php developer for 5 years and im using Javascript often. Usually im using jQuery and ive never used pure javascript before.
    
            Lately ive been using Vuejs to make web apps and i like it. Now im kind of curious how everything is working and i have the feeling that i dont understand alot of things that goes with it. I know a bit how to use Vue but i do things on a hacky way because i dont understand the technology behind it
    
            I want to start digging deeper in javascript like npm, frameworks, librarys, tools, webpack, nodejs(these terms are kind of broad but im so confused), but i dont know where to start.
    
            My goal is to be a better front end developer but i also want to learn more about the technology and what you can do with Javascript.
    
            Does anyone have a list of articles that you want to share so i can learn it from the very bottom?
    
            Thanks alot! :)`,
        author: yennefer._id,
        category: 'javascript',
        description: 'I need help getting to grips with this stuff!',
        image: `${config.staticUrl}learn-modern-javascript-post-image.jpg`
    }).save();

    const createReactOrAngularPost = new Post({
        title: 'Ready to move on from BackBone JS. Shall I go with React or Angular?', 
        text: `We have an ecommerce platform that is built using BackboneJS, with requireJS and HandlebarsJS for modularity and templating engine, respectively.
    
        Whenever I see job postings in my area, it is dominated by either React or Angular. So I figured this may be the time to move on.
    
        I am certain I wasn’t the first one. So to those who felt the same way before, what was your decision and what made you pick one over the other?`,
        author: uhtred._id,
        category: 'javascript',
        description: 'Need help deciding between React and Angular',
        image: `${config.staticUrl}react-or-angular-post-image.jpg`
    }).save();
    

    // Below here has no comments

    const ForHonorPost = new Post({
        title: `I want the faction war to do more`, 
        text: `Just like the title says, I wish that factions had more of an effect on the game than just emblems. For example, playing a Hero that matches your faction grants more exp, maybe 10-25% more.

        If you have any ideas, please share them.
        
        Edit: Someone in the comments had an idea of changing or tweaking the matchmaking system to try and place you on teams with people from your own faction, which I thought was a cool idea.`,
        author: maximus._id,
        category: 'games',
        description: "Ubi plz, buff faction war.",
        image: `${config.staticUrl}faction-war-post-image.jpg`
    }).save();

    const ModalsPost = new Post({
        title: `How to do modal dialogs with redux?`, 
        text: `Hi! In my app (React/Redux/TypeScript/Ducks-like modules), I need to add a CreateUserDialog (a modal window), which can be called from several different places. Sometimes I need to pass data to it on opening (e.g. to which community the new user belongs), and sometimes not.`,
        author: amelia._id,
        category: 'javascript',
        description: "What's to do about modals?",
        image: `${config.staticUrl}modals-post-image.jpg`
    }).save();

    const UnitTestingPost = new Post({
        title: `Learning enough to write unit tests?`, 
        text: `So im a Automation Engineer (QA) at a Web-Dev company. The devs have set up a unit testing framework by using Jest and Enzyme to unit test react and js code. I have very little knowledge of react. Although I have used jest before (a bit) to test normal JS code, and I am familiar with JS.`,
        author: logen._id,
        category: 'javascript', 
        description: "Am stuck in lifecycle method please send help",
        image: `${config.staticUrl}unit-testing-post-image.jpg`
    }).save();

    const DragonAgePost = new Post({
        title: `Where else to buy DA2 DLC:Legacy?`, 
        text: `Hi People!

        Where do you bought the DLC Legacy? I was looking for it and I only found it in 'Origin', but I think it's a little bit expensive (USD 20). Then I looked in Steam and GOG but nothing.
        
        Where else you know I can buy the DLC?
        
        Thank you all and may the Maker watch over you.`,
        author: jeanne._id,
        category: 'games',
        description: "Blessed are the answer givers, the champions of my wallet.",
        image: `${config.staticUrl}dragon-age-post-image.jpg`
    }).save();

    const WhiteHousePost = new Post({
        title: `White house revises statment saying Iran 'has' nuclear weapons`, 
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
        author: maximus._id,
        category: 'news',
        description: "12 crazy things the president has done, you won't believe number 8!",
        image: `${config.staticUrl}white-house-post-image.jpg`
    }).save();

    const KoreaPost = new Post({
        title: `Kim Jong Un agrees to meet Trump at DMZ`, 
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
        author: logen._id,
        category: 'news',
        description: "What happens next will warm your heart!",
        image: `${config.staticUrl}korea-post-image.jpg`
    }).save();

    const CSSCrisisPost = new Post({
        title: `HTML and CSS are giving me an existential crisis!!`, 
        text: `Backstory
        I'm doing a masters in accounting. At the beginning of my accounting education, it wasn't so bad it. However, as I've got further along, I've realised this isn't something I can do for the rest of my life. I would be miserable.
    
        While searching for what I want to do with my life, I tried out programming and fell in love with it. I still love it. I love writing the logic, the algorithms, making things. I made the commitment to becoming a web developer and I'm doing well, aside from one thing. HTML and CSS take the enjoyment out of it for me and I become very unproductive. I'm actually very good at it. My front end work has been described as "top-notch" from a reputable person. I just don't enjoy it and it makes me rethink the whole become a web developer thing.
    
        Question
        Web development is the 'easiest' to get into, as there is a lot of demand and you really do not need a degree to get a job as a web developer.
    
        What are the options for someone who wants to code, but hates front end? I know someone will say backend, but from what I've seen, there are jobs for Front End Devs or Full Stack devs, but posting for Backend Engineers are scarce.
    
        It has to be something with pretty good demand and not having a degree in a related field shouldn't be a barrier. I can't go back to Uni. I've already spent so much time on accounting. I want to get a move on with my life. Therefore, ideally something that won't take over a year as I really, really want a job. I can commit full-time to whatever it may be.`,
        author: andrea._id,
        category: 'javascript',
        description: `I love coding but HTML and CSS really suck the fun out of it for me. Should things be this hard?`,
        image: `${config.staticUrl}css-crisis-post-image.jpg`
    }).save();
    
    const AlgoTradingPost = new Post({
        title: `JavaScript Algo Trading?`, 
        text: `Does anyone think Javascript has a chance of becoming a leading language for algo trading? If Python can do it why not JS? I’m building a site that lets you code indicators and trading models in Javascript. If interested check it out and send me any feedback.`,
        author: mark._id,
        category: 'javascript',
        description: `Is there any possibility of JavaScript becoming a goto language for algo trading?`,
        image: `${config.staticUrl}algo-trading-post-image.jpg`
    }).save();
    
    const BetterDevTipsPost = new Post({
        title: `How do you guys like to improve your skills?`, 
        text: `What is your favorite and most efficient way to learn new things or improve some skills? Also please do refer your favorite resources. Let's share and help each other! :)
    
        I personally like to read articles/documentations and do new-ish online courses mostly on udemy.`,
        author: rebecca._id,
        category: 'javascript',
        description: `Share any tips or tricks you have for becoming a better developer.`,
        image: `${config.staticUrl}better-dev-tips-post-image.jpg`
    }).save();
    
    const SessionIDPost = new Post({
        title: `req.sessionID is different with every request and I can't figure out why`, 
        text: `I am running node behind a Nginx https server. I've followed all the steps that Au points out in this thread but its still not working. Does anyone have a definitive way of solving this?
    
        I set 'trust proxy' to true and this is now I set up the session.
    
        app.use(session({ secret: 'wonderbreadbatfingers', resave: false, saveUninitialized: false, cookie: {secure: true, httpOnly: true, maxAge: 3600000}, store: new redisStore({client: rds}), proxy: true, name: 'sid' }));
    
        Any ideas?
    
        node v6.11.5`,
        author: divon._id,
        category: 'javascript',
        description: `Mo Node mo problems`,
        image: `${config.staticUrl}sessionid-post-image.jpg`
    }).save();
    
    const RxJSReduxPost = new Post({
        title: `Is there a way to use RxJS as a store instead of Redux?`, 
        text: `I'm just learning RxJS and it feels like it has everything that things like Redux provides (although may be not directly). I am not against Redux, but I'm wondering if we can simplify things using pure RxJS.
    
        EDIT: I'm not trying to just replace Redux with RxJS, my thinking is more like, why should we use both RxJS and Redux but why not just do everything in RxJS`,
        author: amelia._id,
        category: 'javascript',
        description: `A question about RxJS and Redux.`,
        image: `${config.staticUrl}rxjs-redux-post-image.jpg`
    }).save();
    
    const TodoAppPost = new Post({
        title: `I made a todo app, could you give me some feedback?`, 
        text: `Link: https://codepen.io/karlomajer/pen/rvyyvV
    
        I'm still quite new to Javascript, this is the second app that I've made. I have a feeling that my approach in making a to-do list is pretty bad but I don't exactly know how could I make it better.
    
        Also, is there a way that I could make my todo-menu-1 and todo-menu-2 fixed so that they are always visible. Right now, my whole app becomes scrollable when you add a lot of todos but I only want the todos to be scrollable and not the 2 menus that are above and below them. It's probably very simple but I can't seem to figure it out haha`,
        author: tyrion._id,
        category: 'javascript',
        description: `Looking or feedback on my first app`,
        image: `${config.staticUrl}todo-app-post-image.jpg`
    }).save();
    
    const JavaScriptBooksPost = new Post({
        title: `What are some good JavaScript books that answer some of the 'why' questions?`, 
        text: `If I wanted to understand not just what something in JS is and how it works, but also why it was designed to work the way it works, what would be some good books that go into this kind of analysis?
    
        Thanks.`,
        author: obara._id,
        category: 'javascript',
        description: `I have a thirst for knowledge.`,
        image: `${config.staticUrl}javascript-books-post-image.jpg`
    }).save();

    const MothersDayPost = new Post({
        title: `Happy Mothers day! Who are the greatest mothers in fantasy, and why?`, 
        text: `It's Mother's Day, and I want to take a minute to recognize the mothers of fantasy. Much of the literature in this genre has a bunch of twenty-somethings going off on a magical quest to save the world, neglecting to inform their families or even invite them along. How rude of them. Today we celebrate motherhood, and mothers, and I wanna know who your favorite mothers are in literature!
    
        My personal choice is Yennefer of Vengerberg, from The Witcher books by Andrzej Sapkowski. Yennefer, Geralt, and Ciri make up a wonderful trio; while most people focus on Geralt (he's the main character after all) or Ciri (she's the MacGuffin, after all), many fans of the series have fallen in love with lilacs-and-gooseberries, her domineering attitude, and no-holds-barred approach she takes to protecting those she loves. Yennefer is strong for her enemies and weak for her family; her cunning and plans take a backseat when it comes to loving Geralt and Cirilla. Their unlikely family is a three-legged stool that falls apart if you remove Yennefer. I love that Sapkowski allows her to be flawed, and Geralt and Yennefer work because they can look past each other's flaws and see the beauty beneath. I think Yennefer of Vengerberg is a wonderful celebration of motherhood, and I thank Sapkowski for writing her so credibly.
    
        Now, talk!`,
        author: maximus._id,
        category: 'fantasy',
        description: `A search for the greatest mum in fantasy.`,
        image: `${config.staticUrl}mothers-day-post-image.jpg`
    }).save();
    
    const DarkHighFantasyRecPost = new Post({
        title: `(Book recommendations) Looking for some Dark High Fantasy.`, 
        text: `I love world's full of creatures and magic and realistic problems that make sense in that world and how realistic characters interact with those problems and solve them. I also can't fault a classic heroes journey but also love twists and subverted expectations.
    
        I don't like long series really either. 3 or 4 books is like a hotspot for me before I start to get bored and move on. Unless they are shorter books. I really enjoyed Mistborn and I am liking the second era but the characters feel kinda shallow or cartoonish and the story is light and simple (isn't necessarily a bad thing just not what I am looking for at the moment).
    
        Finished the First Law trilogy and started reading Best Served Cold but it got too depressing and there was no magic (magic is literally dying...). I want realistic characters and problems (or as close as you get in a world with magic) but don't want the book to make me depressed. Also everyone is an asshole these lol.
    
        Another good series I liked recently was the Gunpowder Mage Trilogy. It was cool concepts and cool characters. There was a decent amount of magic but all the main characters felt like they were all too strong like there weren't that many stakes. Logan Nine-Fingers also suffered from the feeling that he was unbeatable.
    
        The Red Queen's War trilogy had great characters, good story, hardly any magic though. Loved the world of The Vagrant. Not heaps of magic used in like fights, but there was definitely magic affecting everything and plenty of creatures. Painted man was really cool with the runes and demon's but it got boring and the later books ended being more focused on cheesy romance bullshit.
    
        The Storm light archive seems to have what I am looking for but I am probably going to wait until the series is finished before I start properly getting into it.
    
        Basically a world like the Elder Scrolls series, DnD or Lotr' but with more serious themes like The First Law, Red Queen War or even Way of Shadows. Or a better explanation might be Asoiaf but with ten times the magic. Like Harry Potter levels. Strong plot/serious characters and lots of magic fights and casual use of magic. These are the two main things I love but like a broken Venn diagram they hardly meet in fantasy...
    
        Probably asking way too much lol. Maybe I should write a book instead.
    
        EDIT: Omg thanks for all the awesome comments and suggestions. Didn't expect such a big response. Now if you excuse me I better get reading! I have multiple world's I need to get immersed in. See you all in a few years time when I want something else haha!`,
        author: jeanne._id,
        category: 'fantasy',
        description: `I'm on the look out for some good, dark, high fantasy books.`,
        image: `${config.staticUrl}dark-high-fantasy-rec-post-image.jpg`
    }).save();
    
    const AsianFantasyRecPost = new Post({
        title: `Recommendations for asian style fantasy?`, 
        text: `Taking a break from the sometimes repetitive western fantasy.Looking for recommendations for fantasy based on Eastern/Asian culture.(Not sure if this is the appropriate name of the genre,i apologise if i am wrong) Basically, anything like Will Wight's Cradle Series,Fonda Lee's Jade City and RF Kuang's Poppy War.(I loved all three,and finding more like these would be amazing).Thanks in Advance!`,
        author: william._id,
        category: 'fantasy',
        description: `Looking for some good fantasy based on asian history and folklore.`,
        image: `${config.staticUrl}asian-fantasy-rec-post-image.jpg`
    }).save();
    
    const fantasyTVPost = new Post({
        title: `Medieval/magic themed TV shows to get into?`, 
        text: `Game of Thrones, Vikings, Magicians, True Blood, that kinda thing. Preferrably something that focuses more on the relationships between characters but has a lot of supernatural/medieval themes behind it.`,
        author: yennefer._id,
        category: 'fantasy',
        description: `I need a new show to binge on!`,
        image: `${config.staticUrl}fantasy-tv-post-image.jpg`
    }).save();
    
    const readNextPost = new Post({
        title: `How do you pick what to read next?`, 
        text: `I’m relatively new into reading fantasy, and I feel paralyzed trying to choose what series I want to dive into next. There are so many that sound amazing and that I see recommendations for all over the place. It feels like by choosing one I’m giving myself book FOMO 🤣 It’s not that deep, I’m just excited by good books. How do you all go about choosing what to read next? Does anyone else have this issue?`,
        author: uhtred._id,
        category: 'fantasy',
        description: `Dealing with choice paralysis`,
        image: `${config.staticUrl}read-next-post-image.jpg`
    }).save();
    
    const nameOfTheWindPost = new Post({
        title: `Going to be starting The Name of the Wind`, 
        text: `I'm a big fan of The Stormlight Archive, and I want to get some more epic fantasy in me that doesn't require me reading 14 Wheel of Time books (which I will do someday)
    
        A question though, I think it might seem like a good idea to wait and read Wise Man's Fears since the fate of the third book is up in the air? That's what I got from my limited research on the series. Most people said the first book is a good standalone, so if the third book is never released I wont be super pissed right?
    
        Regardless, I just want another awesome fantasy book to read!`,
        author: monza._id,
        category: 'fantasy',
        description: `No stop til Rothfuss`,
        image: `${config.staticUrl}name-of-the-wind-post-image.jpg`
    }).save();
    
    const SandersonRecPost = new Post({
        title: `What to read from Brandon Sanderson after Way of Kings?`, 
        text: `Hey there,
    
        It is a living hell here. I can't seem to find a book which would match The 3 tomes of the Way of kings.
    
        I'm trying Shanara but it is impressively flat, deja vu after 200 pages and I don't have this breathe taking feeling which I had when reading Kaladin's epic stories. My GF is currently reading it and discovering the story and i'm kind of jaleous that she can still discover it.
    
        I'm wondering which book can I read after that?
    
        Is Word of Radiance worth it compared to the Way of Kings in its story / characters ?
    
        I hope you'll be giving me ideas of next book and I would probably give up on Shanara.
    
        Cheers`,
        author: logen._id,
        category: 'fantasy',
        description: `Recommend me a book!`,
        image: `${config.staticUrl}sanderson-rec-post-image.jpg`
    }).save();
    
    const BrokenKnivesPost = new Post({
        title: `A review of The Court of Broken Knives`, 
        text: `As a huge fan of R. Scott Bakker, I was quite eager to read this book as I’ve seen many liken it to the Second Apocalypse series. Unfortunately, this book didn’t quite do it for me.
    
        Rating: 5/10
    
        Characters:
    
        For me, the characters in this book were very 50/50. The main character, Marith, is an absolutely insufferable piece of shit. He’s got the typical negative qualities of a modern grimdark anti-hero (Arrogant, pretentious, sociopathic), but lacks any of the counterbalancing qualities which allow you to root for him (Humour, charm etc.). By the end of the book, I was hoping someone would shove a sword through his face. I appreciate that Smith was maybe trying to move away from that stereotype, but it only resulted in a horrible little bastard who desperately needs to get his comeuppance.
    
        The other main characters include Tobias and his two buddies, Rate and Alxine who I actually quite liked even if they were just your standard brutish swords-for-hire. Orhan Emmereth is a disgruntled High Lord who desperately wants to see his nation returned to its former glory. While his motivations were very believable, he was very boring apart from some rare moments. Finally there is Thalia, the reluctant High Priestess of Tanis. Her character wasn’t hugely compelling to me, but there is definitely potential for her in the next book.
    
        Plot:
    
        As someone who goes into a novel not overly concerned about how complex a plot is, this book’s was fairly good, especially the first half. The story is simple, a group of mercenaries (Tobias, Rate, Alxine and Marith) are tasked by Orhan Emmereth to assassinate the Emperor as a way for Orhan to seize control and get the Empire’s priorities straight. That’s the first half of the book, which I really enjoyed, but the second half (which I won’t go into detail about) felt a bit disjointed to me and the character’s motivations didn’t seem clear to me. Overall I was left with a sour taste in my mouth due to the ending, despite an okay battle towards the conclusion.
    
        Worldbuilding:
    
        The novel’s setting is fairly standard but I did really like Sorlost, the centre of a decaying empire, characterised by its extravagant wealth. There are moments where magic is displayed but the intricacies of it aren’t really touched upon so I can’t really say anything about it. We don’t see much else from the book apart from Marith’s homeland which is just a few cold islands.
    
        Prose:
    
        Probably the most discussed aspect of the novel I’ve seen in various reviews. It’s certainly... unique. Smith really does make a point of detailing the violence in the book and how the characters react to it. However, for me it came off in many cases as gratuitous during the violent scenes and didn’t really suit the parts outside of that.
    
        General thoughts/TL;DR
    
        The Court of Broken Knives is an okay novel with some interesting concepts and ideas embedded in it. Unfortunately, this potential is largely untapped and the novel suffers as a result. The characters aren’t consistent, the plot falls flat in the second half, the world isn’t expanded on enough and the prose fails to capture the reader. I do hope this series improves as I can definitely see potential but overall, this book wasn’t great and there is much better stuff out there.`,
        author: obara._id,
        category: 'fantasy',
        description: `My thoughts on this modern grimdark story`,
        image: `${config.staticUrl}broken-knives-post-image.jpg`
    }).save();
    
    const FavouriteCityPost = new Post({
        title: `What's your favourite castle/keep/city that you would want to spend an entire book or series in?`, 
        text: `There’s always going to be that one location in a fantasy series that captures our imagination. One which we never want to leave and any other location pales in comparison to it. What’s your favorite?`,
        author: tyrion._id,
        category: 'fantasy',
        description: `Looking to take a fantasy vacation!`,
        image: `${config.staticUrl}favourite-city-post-image.jpg`
    }).save();

    const UnfairWitcherPost = new Post({
        title: `This is unfair.`, 
        text: `It's Unfair to other games how good this game is , Some of them don't even wants to try to beat this .
    
        It's been 3 years since witcher 3 came out, and I've played almost all of the triple A or notice worthy games ever since then. Each time i do, i can't help but think how flowed they are compare to W3 .
    
        Sure some of them were distracting and Very good , but going back to W3 again for another play through (my fifth) , I can't help but wonder if they were really good or not .
    
        Forget about fine wine , this game rarely age at all , Just like witchers .
    
        Ps - Ever wonder about 10 years from now if they would release a enhanced edition of w3 , how cool would it be .`,
        author: adam._id,
        category: 'games',
        description: `Why should other games even try at this point?`,
        image: `${config.staticUrl}unfair-witcher-post-image.jpg`
    }).save();
    
    const DragonbornsHateHimPost = new Post({
        title: `Find out how this one vampire found my one weakness, dragonborns hate him!`, 
        text: `So I'm in the middle of Dawnguard, just chillin' up in Whiterun where all of a sudden a 'traveller' shows up. I go to talk to him but he knows I am a Dawnguard member. So he attacks.
    
        'Fair enough', I think to myself. Another Vampire shall fall at my blade, 'Vampire's Bane' I called it. You see I play on Legendary. It's not the most fun, but I have had a few epic battles on this save. It's the longest I've ever played before getting bored and starting a new character.
    
        One Handed 100, Heavy Armour 100, Block 100. Fully decked out in Dragonplate Armour, the best in the game, and Vampire's Bane. A Dragon Bone sword. Burns the Target for 30 points, Targets on Fire take extra damage. Does 37 points of magicka damage.
    
        Oh yes that's right, Smithing 100 and Enchanting 100. Full set of Blacksmithing gear to make my weapons and armour as good as they can be without the alchemy exploit.
    
        Also, My armour and Ring and Jewellery allow me to cast any restroration spell for free. Perfect counter to the undead. Also, Shock and magicka resistance. Because Drain Life and Lightning attacks are a bitch to deal with.
    
        I am fully prepared to take down any vampire. Now, none of my turn undead spells will work, as there is no spell strong enough to affect this vampire (or, most of the vapires I run into sadly)
    
        But I can dual cast a Greater Ward and hold it indefinitely. Perfect for letting him use up his magick quickly. Any damage done to me is easily healed. And failing that, my armour resists it so I haven't had any trouble with Vampires since making these sweet upgrades.
    
        Normally, the Vampire resorts to using a weapon. That's when I go in for the kill. My shield blocks their swings like Captain America. My shield bash stuns them, and Vampire's Bane burns them while draining what little magicka they have recovered! And if they still hurt me too much I can still block while I heal and switch back to Vampire's Bane quickly enough.
    
        Only this Vampire did not resort to using a weapon. No, he resorted to using his fists! Haha! Can you believe that? The residents of Whiterun outnumber him but can't really hurt him. Luckily he's focused on me so there are no casualties. Really they should just let me take him alone. I mean, look at what I'm wearing you fools.
    
        So I can't swing mysword as often as I'd like, I don't want to accidentally hit one of them and somehow have to take on a Master Vampire as well as the whole goddamn City! So I try drawing him away from the crowd, health constantly at full.
    
        Then a punch is thrown. Cue 1960's Batman punch sound effects because those fucking hurt. Really, 1/3rd of my health in a punch? Pfft, no matter. I can keep my distance, heal and attack and get out of range. So I do exactly that. So the Vampire does the one thing nobody fucking expected. He PICKED ME UP, HIGH ABOVE HIS HEAD AND THE THREW ME ON THE MOTHERFUCKING GROUND!!
    
        AND THAT KILLED ME!
    
        I am about as powerful as I can be and that's all it takes to put down a Dragonborn? Are you serious?`,
        author: andrea._id,
        category: 'games',
        description: `A tale of love, hate, and vampires.`,
        image: `${config.staticUrl}dragonborn-post-image.jpg`
    }).save();
    
    const GuardSwitchDelayPost = new Post({
        title: `Remove guard switch delay`, 
        text: `This is the worst gameplay mechanic i've ever seen in a game. Failing to block and getting hit IS ALREADY the punishment, there is no need to get guaranteed CC moves applied just because you failed to switch guards.
    
        This mechanic is so bad, it doesn't only affect people that failed to block. It also affects mouse users that have to choose between reactability with higher sensitivity, or such a low sensitivity that you'll parry the wrong side half the time because the guard didn't switch in time.
    
        If this mechanic is so damn important that it needs to be in the game, add a function that allows you to cancel all buffered guard switches, because this https://youtu.be/PzDYk1WqMrE is just dumb. "Getting parried, accidentally switching guards once and being punished with a guaranteed jab".`,
        author: mark._id,
        category: 'games',
        description: `Bitching about guard switch delay`,
        image: `${config.staticUrl}for-honor-guard-switch-post-image.jpg`
    }).save();
    
    const CyberpunkCompanionsPost = new Post({
        title: `Companions and dialogue`, 
        text: `In the gritty not-so-distant-future that is Cyberpunk. I’d imagine you’d need some friends. I hope Companions will be a feature in this game. Companions allows the player to feel less isolated in the expansive game world, and can add a whole lot to the immersion. However, companions can feel somewhat lifeless and one-dimensional if they’re not implemented well. I hope companions have enough lines dialogue to react to the player’s surroundings and the situation you are in. The dialogue can also be influenced by the relationship between the player and that companion, based on previous experiences and decisions. I know. I know. That’s a tall order, but you never know what CDPR is capable of. This can also apply for NPCs in general, and not companions alone. Dialogue should feel dynamic, and less repetitive. It should feel like a genuine conversation rather than just four options on a wheel that don’t lead to much. However, Companions are NPCs that you may journey with for hours on end. They should have rich backstories that you can learn about, piece-by-piece as you converse with them. I think the game should allow multiple companions at once, with a party system. I hope the companions can have interesting lines of dialogue as they converse with one another. I think that would be interesting too. This is really far-fetched and I highly doubt would be implemented as no other RPG that I know of has done it before. Customisable Companions. In which, you can create your very own follower to join your posse, maybe a few pre-made “sets” of personalities, voices and backstories. Yeah. I know. That’s not plausible at all. That’s a whole shit-ton of lines of dialogue. Companions alone can take an incredibly long time to write and voice-act, let alone custom companions Maybe with Mods that can become a reality. Thanks for reading.`,
        author: rebecca._id,
        category: 'games',
        description: `My hopes for companions and dialogue in the upcoming CyberPunk2077`,
        image: `${config.staticUrl}cyberpunk-companions-post-image.jpg`
    }).save();
    
    const CCTVPost = new Post({
        title: `Metropolitan Police's facial recognition technology 98% inaccurate, figures show`, 
        text: `Facial recognition software used by the UK’s biggest police force has returned false positives in more than 98 per cent of alerts generated, The Independent can reveal, with the country’s biometrics regulator calling it “not yet fit for use”.
    
        The Metropolitan Police’s system has produced 104 alerts of which only two were later confirmed to be positive matches, a freedom of information request showed. In its response the force said it did not consider the inaccurate matches “false positives” because alerts were checked a second time after they occurred.
    
        Facial recognition technology scans people in a video feed and compares their images to pictures stored in a reference library or watch list. It has been used at large events like the Notting Hill Carnival and a Six Nations Rugby match.`,
        author: divon._id,
        category: 'news',
        description: `It's not looking good but they're putting on a brave face.`,
        image: `${config.staticUrl}cctv-post-image.jpg`
    }).save();
    
    const PornPassPost = new Post({
        title: `UK newsstands will sell ‘porn passes’ to verify ages under new laws`, 
        text: `ast year, Britain approved the Digital Economy Act 2017, which included strict new rules regarding access to pornographic websites. When the law goes into effect later this year, regulators have suggested that users will be able to purchase a so-called “porn pass,” from their local newsstand to verify their age.
    
        The law will require websites to verify the users ages, or face stiff penalties. Those who don’t comply risk being blocked by internet service providers, and would face fines of up to £250,000 ($350,000). However, the implementation of those rules have been delayed to give the British Board of Film Classification (BBFC) more time to draft its guidelines. Once it does so, those new guidelines will require approval from Parliament.
    
        The government has said that industry will be responsible to create the verification software, with platforms such as MindGeek’s AgeID cited as one way to verify a user’s age. However, there are concerns about the implications for privacy under such a framework, and The Telegraph reports that the BBFC is suggesting a more anonymous option: their local newsstand. The stores would sell a “porn pass,” a 16-digit code for around £10, and would require a driver’s license or passport to verify the buyer’s age. That method wouldn’t require someone to enter their personal information into an online database. In 2015, the Digital Police Alliance suggested that websites utilize “information already on the books” to carry out these checks, such as post offices or wireless providers.`,
        author: amelia._id,
        category: 'news',
        description: `Fucking lol`,
        image: `${config.staticUrl}porn-pass-post-image.jpg`
    }).save();
    
    const MaleFashionPost = new Post({
        title: `What are some brands that are between (in price and quality) reddits usual suggestions and the high end brands?`, 
        text: `As someone more interested in quality and good materials over brands, I am always surprised how the price goes up almost exponentially when getting into better quality clothing from high end brands.
    
        The discussion I would like to see is if there are brands out there that aim to provide the same quality and materials as high end brands but without the extra cost of paying for the brandname itself.`,
        author: tyrion._id,
        category: 'fashion',
        description: `Looking for some good midrange clothes`,
        image: `${config.staticUrl}male-fashion-post-image.jpg`
    }).save();
    
    const FemalFashionPost = new Post({
        title: `Am I the only one that sucks at dressing in the summer?`, 
        text: `So I live in a part of Canada where it’s cold from mid September-mid May every year and I SUCK at dressing for the summer!
    
        I look in my closet and I have so many pairs of jeans, so many sweaters, so much black.. and I have 3 pairs of shorts, a couple pairs of flip flops, a few tank tops and some old t-shirts.
    
        Not to mention I find a lot of summer clothing uncomfortable, especially denim shorts! I’m very flat chested so I struggle with anything off the shoulder or low-neck because everyone will see my nips lol.
    
        All in all I look at my closet every year when it starts to get warm out, and feel like a hot mess. It’s so easy for me to just throw on a cute pair of jeans, a knit sweater, some boots and a belt and just walk out the door but I can’t do that ugh.
    
        And don’t even get me started on swim wear... shopping for swimsuits makes me so stressed out that I’ve just been wearing the same cheap one that I hate for the past two years.
    
        So for you ladies that deal with hot weather more than I do, how can I get better at shopping for summer pieces? What are the most important summer staples to have in my closet? How can I feel more confident wearing them? How do I stop myself from going straight to the jeans and sweaters every time I go into a clothing store?`,
        author: obara._id,
        category: 'fashion',
        description: `Help me out ladies!`,
        image: `${config.staticUrl}female-fashion-post-image.jpg`
    }).save();

    const TravelPost = new Post({
        title: `Is it too late to plan a backpacking trip to Europe?`, 
        text: ` I'm 24 male with a bit of wilderness backpacking experience and am interested in travelling to Europe beginning the last week of July. It would likely be 3-4 weeks, with a budget of total of $2000 including flight ticket. I'm open to anywhere in Europe, preferably with great scenery, but it should be on the cheaper side. I'm leaning towards Spain because I speak Spanish, but I've heard it is hot during the summer. I would like to stay in hostels mostly but am able to camp with a backpacking tent as well.
    
        Any suggestions/routes you would recommend? Is it too late/expensive to get a round-trip plane ticket for the last week of july- last week of August? I'm coming from California, USA and am a current college student.`,
        author: logen._id,
        category: 'travel',
        description: `Considering a backpacking trip`,
        image: `${config.staticUrl}travel-post-image.jpg`
    }).save();
    
    const MotivationPost = new Post({
        title: `Your natural abilities are only a small part of the story`, 
        text: `Preface
    
        I took all the material from an article titled "The Three Factors that Determine How Successful You Are at Learning". If you want to read more about this topic with better formatting and links to relevant sources, go there.
    
        Introduction
    
        Let’s start with the obvious: natural abilities absolutely matter. That is, the smarter and more talented you are, the easier it will be for you to succeed.
    
        However, in the vast majority of cases, our innate abilities cannot guarantee success, or prevent us from reaching our goals. In fact, the majority of studies show that factors such as self-discipline are as good and sometimes even better predictors of success than factors such as intelligence.
    
        One study, for example, found that conscientiousness, or the trait of being “organized, purposeful, driven, and self-disciplined”, is the best predictor of academic achievement, and accounts for five times as much variance in students’ grades as does intelligence.`,
        author: monza._id,
        category: 'motivation',
        description: `What mainly determines your success in life is how much effort you are willing to put in, and how smart you work.`,
        image: `${config.staticUrl}motivation-post-image.jpg`
    }).save();
    
    const RelationshipsPost = new Post({
        title: `My girlfriend just told me she is pregnant`, 
        text: ` We've been together for about a year. I don't know what to do. Last night she told me she is pregnant and I was shocked. She is on birth control and we initially used condoms until we were in a committed relationship and both tested. She told me it's fairly unlikely that she'll be able to conceive naturally because of this medical condition she has so I thought that combined with the birth control, we'd be good to go. But we also talked about what would happen just in case she did get pregnant and we both agreed we would want an abortion
    
        Now she doesn't want an abortion, even though just a month ago she brought up our "just in case" abortion fund. I don't know what to do. Obviously it is her choice whether or not she gets an abortion but I can't help but want to change her mind. I suppose that isn't ethical? I can't even think straight. I've never even wanted kids and I didn't go to college. How could I ever support a child if I didn't go to college. Just worked after high school because I know what I want to do with my life and my salary is plenty for me but I don't think I would able to give a baby a very happy life with it
    
        This morning she posted that she was pregnant on facebook and she made it seem like this great news. I *just* found out and I woke up to a bunch of calls from my parents asking wtf was going on. A couple people asked if we're getting married. Girlfriend is now mad because I didn't prepare anything for her for mothers day
    
        I'm trying to keep it together, and I'm trying to be understanding with. my girlfriend because I'm sure she is just as freaked out as I am. But now everyone knows and my entire life is changed. I just don't know what to do. Does anyone have any advice for me, thank you`,
        author: uhtred._id,
        category: 'relationships',
        description: `I'm freaking out!`,
        image: `${config.staticUrl}relationships-post-image.jpg`
    }).save();
    
    const DesignPost = new Post({
        title: `Just a friendly reminder: keep a damn sketchbook!`, 
        text: `Hey there. I'd like to share a personal sketchbook journey that hopefully will aid your creative energy, focus, and body of work.
    
        I always used to keep very neat sketchbooks. My lines were very though out, everything was considered and tidy. My work was tidy. They were ok, they served a purpose. The problem is they just weren't doing their job.
    
        I got a job as a designer when I moved out to the west coast 6 years ago. The creative director was a Painter / Artist / Jedi madman. He kept these amazing sketchbooks that had absolutely no filter. All his F*** ups, all of his flaws, his crazy ideas, his great ideas, his bad ideas. The books felt raw, they had illustrations, plane tickets pasted in, drawings over the top of found images, storyboards, meeting notes, and everything in between. All in all, he had about 40 books, bursting from the seams from a career in art direction and design. (he ended up being an executive creative director of one of the largest advertising firms in the world).
    
        Once he told me something that really stuck with me:
    
        90% of the things you create never get made. (Projects get axed, they get frankensteined, and hacked up by clients.) But if you have it in your physical sketch/scrap book...then it is real.
    
        Your ideas and sketches are the most valuable thing you have. You should do them justice by keeping them in a book.
    
        But dont just keep them in a book, give them love. Make art out of your ideas and sketches. Don't be afraid to get messy. Paint your book, paste things into it, remix your old work into something new, write in your book, put your everyday feelings in there. Hack up your projects and collage them with new projects. Create new pieces all together, even things that dont seem like they should go together. The results may surprise you. You don't have to be a great artist to make a great sketchbook that does it's job.
    
        The main thing your book should do for you is to harbor your ideas, good and bad, and inspire new ones. I have learned that going back through my old books has been super helpful in the ideation process. When you look at old projects hacked up and collaged together, sometimes whole new ideas come out of them. If done right, you will come back to these pages years later and have whole new trains of thought.
    
        I have kept these type of books for 5 years now. I am on number 10. They are big, fat, bursting-at-the-seams books, and my whole world from the last 5 years are bound up in them.
    
        You can look inside my most recent one here
    
        All of my books are on my website, feel free to check em out.
    
        Most recently they have opened lots of doors for me. Prospective clients love to see them, and I've been hired for freelance gigs because of them. They are better to bring to an interview than a portfolio or resume. I've even been sent to 2 different countries to give talks about them. I would be happy to share more if anyone has any questions or comments, but I feel like I'm getting long in the tooth.
    
        TL;DR - Keep a sketchbook, it is important, you will thank yourself!
    
        Happy sketchbookin'`,
        author: yennefer._id,
        category: 'design',
        description: `You will thank yourself later.`,
        image: `${config.staticUrl}design-post-image.jpg`
    }).save();
    
    const PoliticsPost = new Post({
        title: `Here are all the laws MPs are voting on this week, explained in plain English`, 
        text: `Lots of smaller laws this week, as the Brexit bill trundles on in the Lords. Friday brings another day of private members' bills. Here's a simple explainer on how they work. 
    
        Click here to get this in your email inbox every Sunday. You can also follow us on Twitter for daily updates.
    
        Monday 7 May
    
        No votes scheduled
    
        Tuesday 8 May
    
        Protection of Pollinators Bill Creates a framework to provide new habitats for bees and butterflies and provide new habitats when land is built on. Ten minute rule motion presented by Ben Bradley MP.
    
        Secure Tenancies (Victims of Domestic Abuse) Bill - report stage and 3rd reading Ensures that social housing tenants with a lifetime lease who need to leave their home because of domestic abuse are granted a new lifetime tenancy in the property they move to. This creates an exception to rules in the Housing and Planning Act 2016, which will require local authorities in England to offer only fixed-term tenancies when they come into force. Started in the Lords, so closer to becoming law than if it started in the Commons.
    
        Nuclear Safeguards Bill - consideration of Lords amendments Creates the legal framework to maintain the UK's current level of nuclear safety after Brexit. This is currently handled by Euratom (the European Atomic Energy Community). This is th! final stage before the bill becomes law!`,
        author: william._id,
        category: 'politics',
        description: `We do the research so you don't have to!`,
        image: `${config.staticUrl}politics-post-image.jpg`
    }).save();
    
    const MentalHealthPost = new Post({
        title: `I'm tired of people in positions of power not taking mental health seriously`, 
        text: `oday was the closest I've ever come to killing myself. The details of why are irrelevant to the rant I'm posting now, so I'm going to forego all that; but basically I had to leave work and was so convinced I was going to just jump in front of traffic that I actually scared myself into calling my boyfriend (who was at work) to come and get me as I was scared to be alone. He attempted to tell his manager that he had an emergency with my mental health and the guy nonchalantly said there was no one to cover and to take out the trash. I live away from my family and had already called some friends to with no luck. I was juggling between calling a hotline and/or 911, or just offing myself because I know I can't afford a hospital stay when fortunately one of my friends called back and rushed to pick me up. My BF's boss sent him home 2 hours later for a bad attitude.
    
        Now that I've calmed down a little bit from all the events and am left with a giant bump on my head from smacking myself in frustration I am absolutely livid that my BF's supervisors would treat a situation like that. Not everyone has the luxury of having a giant network of people to get support from and one of the only people I have is him, especially since we live together. I don't think I should have to put myself in the hospital or die for people to take it seriously but apparently it's not real since I didn't actually jump in front of that car.
    
        Sorry, I mostly needed to rant but would also love opinions on what to do if I feel this way again, and also on whether you think my anger is justified.
    
        tldr: got scary close to killing myself today, was all alone, BF's boss wouldn't let him leave to come help me and now I'm pissed at how no one seems to take mental health seriously.`,
        author: jeanne._id,
        category: 'mentalhealth',
        description: `We need to start making mental health a priority.`,
        image: `${config.staticUrl}mental-health-post-image.jpg`
    }).save();
    
    const MusicPost = new Post({
        title: `The Dangerous Summer is back!`, 
        text: `My favorite band, The Dangerous Summer, is back together again, and they've released two new singles on Spotify, Fire and Ghosts. The album will drop later this month. Music videos have been rel`,
        author: maximus._id,
        category: 'music',
        description: `So stoked on this!`,
        image: `${config.staticUrl}music-post-image.jpg`
    }).save();
    

    const base64Post = await createBase64Post;
    const selfPubPost = await createSelfPubPost;
    const CP2020Post = await createCP2020Post;
    const PrettierPost = await createPrettierPost;
    const ReviewPost = await createReviewPost;
    const WitcherPost = await createWitcherPost;
    const learnModernJavaScriptPost = await createLearnModernJavaScriptPost
    const reactOrAngularPost = await createReactOrAngularPost;

    await Promise.all([
        ForHonorPost,
        ModalsPost,
        UnitTestingPost,
        DragonAgePost,
        WhiteHousePost,
        KoreaPost,
        CSSCrisisPost,
        AlgoTradingPost,
        BetterDevTipsPost,
        SessionIDPost,
        RxJSReduxPost,
        TodoAppPost,
        JavaScriptBooksPost,
        MothersDayPost,
        DarkHighFantasyRecPost,
        AsianFantasyRecPost,
        fantasyTVPost,
        readNextPost,
        nameOfTheWindPost,
        SandersonRecPost,
        BrokenKnivesPost,
        FavouriteCityPost,
        UnfairWitcherPost,
        DragonbornsHateHimPost,
        GuardSwitchDelayPost,
        CyberpunkCompanionsPost,
        CCTVPost,
        PornPassPost,
        MaleFashionPost,
        FemalFashionPost,
        TravelPost,
        MotivationPost,
        RelationshipsPost,
        DesignPost,
        PoliticsPost,
        MentalHealthPost,
        MusicPost
    ]);
    */

    /*
    logger.log('Creating comments...');

    const andreasBase64TLCommentId = mongoose.Types.ObjectId();
    const andreaBase64TLComment = new Comment({
        text: 'Why would you store things as base64? It adds ~30% overhead iirc',
        _id: andreasBase64TLCommentId,
        author: andrea._id,
        discussion: base64Post._id,
        parents: [andreasBase64TLCommentId]
    }).save();

    const tyrionsBase64RCommentId = mongoose.Types.ObjectId();
    const tyrionsBase64RComment = new Comment({
        text: 'One use case I can think of is that you can just insert base64 encoded image to <img> tag in a template and be done with it.',
        _id: tyrionsBase64RCommentId,
        author: tyrion._id,
        discussion: base64Post._id,
        parents: [andreasBase64TLCommentId, tyrionsBase64RCommentId]
    });

    const rebeccasBase64TLCommentId = mongoose.Types.ObjectId();
    const rebeccasBase64TLComment = new Comment({
        text: "store images as raw data on filesystem, don't use base64 for storing. Store only the link to the image in your DB.",
        _id: rebeccasBase64TLCommentId,
        author: rebecca._id,
        discussion: base64Post._id,
        parents: [rebeccasBase64TLCommentId]
    }).save();

    const marksBase64RCommentId = mongoose.Types.ObjectId();
    const marksBase64RComment = new Comment({
        text: `While this doesn't sound to apply to OP's scenario, sometimes you don't have a persistent file storage available and storing small images in database might make sense. Think of a containerized chat application where users can select their own profile picture and setting up a persistent file system just for that functionality would add overhead. Keeping things simple.`,
        _id: marksBase64RCommentId,
        author: mark._id,
        discussion: base64Post._id,
        parents: [rebeccasBase64TLCommentId, marksBase64RCommentId]
    }).save();

    const rebeccasBase64RCommentId = mongoose.Types.ObjectId();
    const rebeccasBase64RComment = new Comment({
        text: `Setting up some form of static hosting is always worth it. Don't forget that when you put the images inside the API response as base64 it becomes impossible to cache in HTTP protocol level and you have to cache those images manually in the browser. If you have graphQL apollo client to help you with that-why not. GraphQL makes it effortles. If you don't-you better set up that static file hosting because with REST it's quite a lot of pain.`,
        _id: rebeccasBase64RCommentId,
        author: rebecca._id,
        discussion: base64Post._id,
        parents: [rebeccasBase64TLCommentId, marksBase64RCommentId, rebeccasBase64RCommentId]
    }).save();

    const adamsSelfPubTLCommentId = mongoose.Types.ObjectId();
    const adamsSelfPubTLComment = new Comment({
        text: `Something something Sufficiently Advanced Magic`,
        _id: adamsSelfPubTLCommentId,
        author: adam._id,
        discussion: selfPubPost._id,
        parents: [adamsSelfPubTLCommentId]
    }).save();

    const tyrionsSelfPubRCommentId = mongoose.Types.ObjectId();
    const tyrionsSelfPubRComment = new Comment({
        text: `Oh shit, didn't realize Sufficiently Advanced Magic was self-published.`,
        _id: tyrionsSelfPubRCommentId,
        author: tyrion._id,
        discussion: selfPubPost._id,
        parents: [adamsSelfPubTLCommentId, tyrionsSelfPubRCommentId]
    }).save();

    const obarasSelfPubRCommentId = mongoose.Types.ObjectId();
    const obarasSelfPubRComment = new Comment({
        text: `Which is really the highest praise a self published author can receive.

        The hope is to make your series as well-written and (sometimes just as important) well-produced as anything you'll grab off the traditional shelves.
        
        The fact of the matter is, there is no objective marker of quality, but, even as an Indie, I certainly agree with the general opinion that traditionally published fantasy has a better chance of being polished than Indie works. But, maybe you'll find more risks and more original fare in the Indie ranks.`,
        _id: obarasSelfPubRCommentId,
        author: obara._id,
        discussion: selfPubPost._id,
        parents: [adamsSelfPubTLCommentId, tyrionsSelfPubRCommentId, obarasSelfPubRCommentId]
    }).save();

    const logensSelfPubRCommentId = mongoose.Types.ObjectId();
    const logensSelfPubRComment = new Comment({
        text: `Right. There's a lot more noise with us Indies clamoring for attention as well, but I honestly feel the "market" decides, the market in this case being readers, and communities like this go a long way toward separating the wheat from the chaff. If you're getting Indie series recommended to you on r/Fantasy, you're probably in for a treat. If you've never heard of it, it's totally up to you whether or not to take a chance on it.

        In those cases, even as an Indie author, I don't fault discerning readers whatsoever for sticking with vetted, traditionally published fantasy authors, even debutants, rather than risking Indies.
        
        That said, pricing must be considered here, and many Indies try to mitigate reader risk by decreasing prices for initial series and first novels, almost as a sample.`,
        _id: logensSelfPubRCommentId,
        author: logen._id,
        discussion: selfPubPost._id,
        parents: [adamsSelfPubTLCommentId, logensSelfPubRCommentId]
    }).save();

    const divonsSelfPubRCommentId = mongoose.Types.ObjectId();
    const divonsSelfPubRComment = new Comment({ 
        text: `Agreed.`,
        _id: divonsSelfPubRCommentId,
        author: divon._id,
        discussion: selfPubPost._id,
        parents: [adamsSelfPubTLCommentId, logensSelfPubRCommentId, divonsSelfPubRCommentId]
    }).save();

    const monzasSelfPubTLCommentId = mongoose.Types.ObjectId();
    const monzasSelfPubTLComment = new Comment({
        text: `Anything that opens up opportunities for writers is a good thing in my book (no pun intended). Traditional publishing is great (and I'm glad I did it), but I think in the future I'll be self-publishing. Why?

        ◘Better control over quality - I get the exact cover I want using the exact artist I wish to produce it. Plus I can have multiple copy editors on the book if I feel that more editing is needed.
        
        ◘Control over release dates. The Disappearance of Winter's Daughter is finished but an't show up in the retail chain until October (luckily people are buying directly from me in the mean time). The reason for the delay -- a non-compete clause that prevents me from releasing this book until several months after Age of War comes out. AoW was supposed to be out already, but it was delayed until July 3rd, so DoWD is delayed as well. Plus, I'm fighting with my publisher for book #4 - #6 of Legends of the First Empire. I want them to come out at six-month intervals and the publisher wants them at one year. I think we are going to compromise at 9 months, but if I self-publish I can get them out on the schedule I want.
        
        ◘Better money - I mentioned The Disappearance of Winter's Daughter (which people are ordering from me) The book isn't even in the stores yet and I've already made more than three times what the first book in the series generated (published by Orbit - a big-five imprint of Hachette Book Group). It's also earned more than twice the income from my latest contract (with Del Rey).
        
        ◘Better audio royalty rates - The big-five publishers are requiring all three of the major rights now (print, ebook, and audio). Depending on how the audio is produced that could mean as little as 3.8% of the sales going to the author, but by selling this right directly I can earn 15% - 20%. Plus I don't have to split half the advance with the publisher. Since my most recent audio deal was seven-figures, that would mean taking a HUGE hit to traditionally publish.`,
        _id: monzasSelfPubTLCommentId,
        author: monza._id,
        discussion: selfPubPost._id,
        parents: [monzasSelfPubTLCommentId]
    }).save();

    const uhtredsSelfPubRCommentId = mongoose.Types.ObjectId();
    const uhtredsSelfPubRComment = new Comment({
        text: `Monza, you're a gift. Always a pleasure to see you pop in just in knowing you're still around..`,
        _id: uhtredsSelfPubRCommentId,
        author: uhtred._id,
        discussion: selfPubPost._id,
        parents: [monzasSelfPubTLCommentId, uhtredsSelfPubRCommentId]
    }).save();

    const yennefersSelfPubTLCommentId = mongoose.Types.ObjectId();
    const yenneferssSelfPubTLComment = new Comment({
        text: `I'm never sure how to parse the argument that publishers provide a filter for quality. I know I'm not the only person who's ever read a genuinely terrible book from a major publisher (not to mention barely edited or even blatantly unedited). At the end of the day, publishers care about one thing: will the book provide a return on investment? Art, quality, timelessness -- these are secondary considerations. Publishing is a business.

        As far as the signal-to-noise problem, that's exactly where communities like r/fantasy shine. Word of mouth from readers you trust is the best way to find quality books. (And from a writer's standpoint, it's more precious than gold, so don't forget to tell other people about the good stuff you've read, too.)`,
        _id: yennefersSelfPubTLCommentId,
        author: yennefer._id,
        discussion: selfPubPost._id,
        parents: [yennefersSelfPubTLCommentId]
    }).save();

    const williamsCP2020TLCommentId = mongoose.Types.ObjectId();
    const williamsCP2020TLComment = new Comment({
        text: ` It is obviously difficult to make, Dragon Age: Origins even made it its primary feature and it only contained 6 short origins but I would love to see that kind of thing again. DAO was a blast to replay because of the origins and it certainly gave a personal feel to the story.`,
        _id: williamsCP2020TLCommentId,
        author: william._id,
        discussion: CP2020Post._id,
        parents: [williamsCP2020TLCommentId]
    }).save();

    const jeannesCP2020RCommentId = mongoose.Types.ObjectId();
    const jeannesCP2020RComment = new Comment({
        text: `let's not forget that it was more than just the origins, your gender, race and class also had a lot of impact on interactions throughout the game.

        I really hope they do a similar approach.`,
        _id: jeannesCP2020RCommentId,
        author: jeanne._id,
        discussion: CP2020Post._id,
        parents: [williamsCP2020TLCommentId, jeannesCP2020RCommentId]
    }).save();

    const maximusCP2020TLCommentId = mongoose.Types.ObjectId();
    const maximusCP2020TLComment = new Comment({
        text: `I would be cool with it, but I rather predict something like Age of Decadence - opening being tied to various characters, one of which would be player character, and others - NPC.`,
        _id: maximusCP2020TLCommentId,
        author: maximus._id,
        discussion: CP2020Post._id,
        parents: [maximusCP2020TLCommentId]
    }).save();

    const adamsCP2020TLCommentId = mongoose.Types.ObjectId();
    const adamsCP2020TLComment = new Comment({
        text: `To be honest I'd prefer Gothic-style opening. So you don't chose the class/role at the beginning, but actually earn it during gameplay.

        Doubt that it's gonna happen though.`,
        _id: adamsCP2020TLCommentId,
        author: adam._id,
        discussion: CP2020Post._id,
        parents: [adamsCP2020TLCommentId]
    }).save();

    const rebeccasCP2020RCommentId = mongoose.Types.ObjectId();
    const rebeccasCP2020RComment = new Comment({
        text: `Or you might find that is exactly how it will happen.`,
        _id: rebeccasCP2020RCommentId,
        author: rebecca._id,
        discussion: CP2020Post._id,
        parents: [adamsCP2020TLCommentId, rebeccasCP2020RCommentId]
    }).save();

    const tyrionsCP2020TLCommentId = mongoose.Types.ObjectId();
    const tyrionsCP2020TLComment = new Comment({
        text: `It would difficult but perhaps the ideal way to go. DA:O's intros depended on your class. The story was essentially the same, but how you started out varied between classes. The only problem is that Cyberpunk RPG has 10 different Roles while Dragon Age only has 3, not including the sub-classes.`,
        _id: tyrionsCP2020TLCommentId,
        author: tyrion._id,
        discussion: CP2020Post._id,
        parents: [tyrionsCP2020TLCommentId]
    }).save();

    const monzasCP2020RCommentId = mongoose.Types.ObjectId();
    const monzasCP2020RComment = new Comment({
        text: `Dragon Age had 6 different intros. City elf, wood elf, high born human, mage, high born dwarf, low born dwarf.`,
        _id: monzasCP2020RCommentId,
        author: monza._id,
        discussion: CP2020Post._id,
        parents: [tyrionsCP2020TLCommentId, monzasCP2020RCommentId]
    }).save();

    const tyrionsCP2020RCommentId = mongoose.Types.ObjectId();
    const tyrionsCP2020RComment = new Comment({
        text: `That's including the sub-classes though`,
        _id: tyrionsCP2020RCommentId,
        author: tyrion._id,
        discussion: CP2020Post._id,
        parents: [tyrionsCP2020TLCommentId, monzasCP2020RCommentId, tyrionsCP2020RCommentId]
    }).save();

    const monzasCP2020SRCommentId = mongoose.Types.ObjectId();
    const monzasCP2020SRComment = new Comment({
        text: `Race and subclass aren't the same thing in a game that has actually subclasses like for the mages, Arcane Warrior, Blood Mage, Shapeshifter, Spirit Healer.`,
        _id: monzasCP2020SRCommentId,
        author: monza._id,
        discussion: CP2020Post._id,
        parents: [tyrionsCP2020TLCommentId, monzasCP2020RCommentId, tyrionsCP2020RCommentId, monzasCP2020SRCommentId]
    }).save();

    const adamsPrettierTLCommentId = mongoose.Types.ObjectId();
    const adamsPrettierTLComment = new Comment({
        text: `Nobody loves what prettier does to their syntax

        Everyone loves what prettier does to their coworkers' syntax`,
        _id: adamsPrettierTLCommentId,
        author: adam._id,
        discussion: PrettierPost._id,
        parents: [adamsPrettierTLCommentId]
    }).save();

    const ameliasPrettierRCommentId = mongoose.Types.ObjectId();
    const ameliasPrettierRComment = new Comment({
        text: `I definitely lose my mind over it. Can't help it.`,
        _id: ameliasPrettierRCommentId,
        author: amelia._id,
        discussion: PrettierPost._id,
        parents: [adamsPrettierTLCommentId, ameliasPrettierRCommentId]
    }).save();

    const yennefersPrettierRCommentId = mongoose.Types.ObjectId();
    const yennefersPrettierRComment = new Comment({
        text: `It's like nails on a chalkboard when I see code that's formatted inconsistently.

        Like some lines with semicolons and some without will drive me crazy. Same with single vs double quotes.`,
        _id: yennefersPrettierRCommentId,
        author: yennefer._id,
        discussion: PrettierPost._id,
        parents: [adamsPrettierTLCommentId, ameliasPrettierRCommentId, yennefersPrettierRCommentId]
    }).save();

    const divonsPrettierTLCommentId = mongoose.Types.ObjectId();
    const divonsPrettierTLComment = new Comment({
        text: `I love prettier!!!`,
        _id: divonsPrettierTLCommentId,
        author: divon._id,
        discussion: PrettierPost._id,
        parents: [divonsPrettierTLCommentId]
    }).save();

    const adamsReviewTLCommentId = mongoose.Types.ObjectId();
    const adamsReviewTLComment = new Comment({
        text: `Hmmm. The hype is growing. I guess I'll need to check this one.`,
        _id: adamsReviewTLCommentId,
        author: adam._id,
        discussion: ReviewPost._id,
        parents: [adamsReviewTLCommentId]
    }).save();

    const uhtredsReviewRCommentId = mongoose.Types.ObjectId();
    const uhtredsReviewRComment = new Comment({
        text: `The hype is strong with this one.`,
        _id: uhtredsReviewRCommentId,
        author: uhtred._id,
        discussion: ReviewPost._id,
        parents: [adamsReviewTLCommentId, uhtredsReviewRCommentId]
    }).save();

    const jeannesReviewTLCommentId = mongoose.Types.ObjectId();
    const jeannesReviewTLComment = new Comment({
        text: `I just bought The Poppy War this morning! I can't wait to get started. Dang work keeping me from reading all day.`,
        _id: jeannesReviewTLCommentId,
        author: jeanne._id,
        discussion: ReviewPost._id,
        parents: [jeannesReviewTLCommentId]
    }).save();

    const tyrionsReviewTLCommentId = mongoose.Types.ObjectId();
    const tyrionsReviewTLComment = new Comment({
        text: `I pre-ordered it on Audible, the premise is just too cool`,
        _id: tyrionsReviewTLCommentId,
        author: tyrion._id,
        discussion: ReviewPost._id,
        parents: [tyrionsReviewTLCommentId]
    }).save();

    const obarasReviewRCommentId = mongoose.Types.ObjectId();
    const obarasReviewRComment = new Comment({
        text: `Oh, I read this in print, am very curious to how the audio version turned out!`,
        _id: obarasReviewRCommentId,
        author: obara._id,
        discussion: ReviewPost._id,
        parents: [tyrionsReviewTLCommentId, obarasReviewRCommentId]
    }).save();

    const uhtredsWitcherTLCommentId = mongoose.Types.ObjectId();
    const uhtredsWitcherTLComment = new Comment({
        text: `Pagans still exist, no need to limit your post to the past tense.`,
        _id: uhtredsWitcherTLCommentId,
        author: uhtred._id,
        discussion: WitcherPost._id,
        parents: [uhtredsWitcherTLCommentId]
    }).save();

    const adamsLearnModernJavaScriptTLCommentId = mongoose.Types.ObjectId();
    const adamsLearnModernJavaScriptTLComment = new Comment({
        text: `Take a look at Wes Bos 30 day Learn Javascript course/challenge!`,
        _id: adamsLearnModernJavaScriptTLCommentId,
        author: adam._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [adamsLearnModernJavaScriptTLCommentId]
    }).save();


    const yennefersLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const yennefersLearnModernJavaScriptRComment = new Comment({
        text: `Nice, gonna give this a try!`,
        _id: yennefersLearnModernJavaScriptRCommentId,
        author: yennefer._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [adamsLearnModernJavaScriptTLCommentId, yennefersLearnModernJavaScriptRCommentId]
    }).save();


    const tyrionsLearnModernJavaScriptTLCommentId = mongoose.Types.ObjectId();
    const tyrionsLearnModernJavaScriptTLComment = new Comment({
        text: `I’m doing a Udemy course right now by Jonas Schmetdtmann called “The Complete JavaScript Course 2018”. Starts from basics, dives in neeper, and also shows parallels between ES5 and ES6. Udemy is also having a mother’s day sale and I think all their courses are $10. This course has been really nice, especially for the extra details and comparisons.`,
        _id: tyrionsLearnModernJavaScriptTLCommentId,
        author: tyrion._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId]
    }).save();

    const divonsLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const divonsLearnModernJavaScriptRComment = new Comment({
        text: `+1 for the Udemy course, especially with the sale going on.

            If you prefer reading your lessons https://javascript.info is really good.

            Wes Bos has a free course called JavaScript30 that is 30 mini projects.`,
        _id: divonsLearnModernJavaScriptRCommentId,
        author: divon._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, divonsLearnModernJavaScriptRCommentId]
    }).save();

    const rebeccasLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const rebeccasLearnModernJavaScriptRComment = new Comment({
        text: `If you haven't done any sort of DOM manipulation or really anything with vanilla JS you definitely want to steer clear of Javascript30 for now. Do some of the other ones or better yet read a book like Eloquent JavaScript (will kick your ass) or do Gordon Zhu's Watch and Code, then read the book and do JavaScript30`,
        _id: rebeccasLearnModernJavaScriptRCommentId,
        author: rebecca._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, divonsLearnModernJavaScriptRCommentId, rebeccasLearnModernJavaScriptRCommentId]
    }).save();

    const logensLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const logensLearnModernJavaScriptRComment = new Comment({
        text: `They're always running great sales. Keep an eye out.`,
        _id: logensLearnModernJavaScriptRCommentId,
        author: logen._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, divonsLearnModernJavaScriptRCommentId, logensLearnModernJavaScriptRCommentId]
    }).save();

    const andreasLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const andreasLearnModernJavaScriptRComment = new Comment({
        text: `Have you tried Gordon’s premium content?`,
        _id: andreasLearnModernJavaScriptRCommentId,
        author: andrea._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, divonsLearnModernJavaScriptRCommentId, rebeccasLearnModernJavaScriptRCommentId, andreasLearnModernJavaScriptRCommentId]
    }).save();

    const obarasLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const obarasLearnModernJavaScriptRComment = new Comment({
        text: `They're pretty much always having a sale. It feels a little like a bait-and-switch. They make you think that you're getting a $200 class for $10, but it's virtually always $10-$15 if you open an incognito window and go there.`,
        _id: obarasLearnModernJavaScriptRCommentId,
        author: obara._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, obarasLearnModernJavaScriptRCommentId]
    }).save();

    const rebeccasLearnModernJavaScriptR2CommentId = mongoose.Types.ObjectId();
    const rebeccasLearnModernJavaScriptR2Comment = new Comment({
        text: `I have not.`,
        _id: rebeccasLearnModernJavaScriptR2CommentId,
        author: rebecca._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, divonsLearnModernJavaScriptRCommentId, rebeccasLearnModernJavaScriptRCommentId, andreasLearnModernJavaScriptRCommentId, rebeccasLearnModernJavaScriptR2CommentId]
    }).save();

    const jeannesLearnModernJavaScriptRCommentId = mongoose.Types.ObjectId();
    const jeannesLearnModernJavaScriptRComment = new Comment({
        text: `I've never not seen a course for 10 dollars.

            *double negative, i know.`,
        _id: jeannesLearnModernJavaScriptRCommentId,
        author: jeanne._id,
        discussion: learnModernJavaScriptPost._id,
        parents: [tyrionsLearnModernJavaScriptTLCommentId, obarasLearnModernJavaScriptRCommentId, jeannesLearnModernJavaScriptRCommentId]
    }).save();

    const adamsReactAngularTLCommentId = mongoose.Types.ObjectId();
    const adamsReactAngularTLComment = new Comment({
        text: `Here’s my recommendation...

        Build a from-scratch authenticated “homepage” on each of React, Angular and Vue.

        Do a full login, logout, revoke access, forgot password password, etc. whatever you want until you worked on each for at least a week or two.

        Then when your done choose React 😂`,
        _id: adamsReactAngularTLCommentId,
        author: adam._id,
        discussion: reactOrAngularPost._id,
        parents: [adamsReactAngularTLCommentId]
    }).save();

    const ameliasReactAngularRCommentId = mongoose.Types.ObjectId();
    const ameliasReactAngularRComment = new Comment({
        text: `Then when your done choose React 😂

        solid advice right here`,
        _id: ameliasReactAngularRCommentId,
        author: amelia._id,
        discussion: reactOrAngularPost._id,
        parents: [adamsReactAngularTLCommentId, ameliasReactAngularRCommentId]
    }).save();

    const uhtredsReactAngularRCommentId = mongoose.Types.ObjectId();
    const uhtredsReactAngularRComment = new Comment({
        text: `I like how you think, you.`,
        _id: uhtredsReactAngularRCommentId,
        author: uhtred._id,
        discussion: reactOrAngularPost._id,
        parents: [adamsReactAngularTLCommentId, uhtredsReactAngularRCommentId]
    }).save();

    const tyrionsReactAngularRCommentId = mongoose.Types.ObjectId();
    const tyrionsReactAngularRComment = new Comment({
        text: `If you try vue, you’ll choose vue. React is by Facebook anyway, I heard zuck gets a monthly download of your internet history if you use react.`,
        _id: tyrionsReactAngularRCommentId,
        author: tyrion._id,
        discussion: reactOrAngularPost._id,
        parents: [tyrionsReactAngularRCommentId]
    }).save();

    const adamsReactAngularRCommentId = mongoose.Types.ObjectId();
    const adamsReactAngularRComment = new Comment({
        text: `Ya know, so long as it’s his decision... and one I agree with, it’s all good!`,
        _id: adamsReactAngularRCommentId,
        author: adam._id,
        discussion: reactOrAngularPost._id,
        parents: [adamsReactAngularTLCommentId, ameliasReactAngularRCommentId, adamsReactAngularRCommentId]
    }).save();


    const obarasReactAngularRCommentId = mongoose.Types.ObjectId();
    const obarasReactAngularRComment = new Comment({
        text: `Your jokes are lame...`,
        _id: obarasReactAngularRCommentId,
        author: obara._id,
        discussion: reactOrAngularPost._id,
        parents: [tyrionsReactAngularRCommentId, obarasReactAngularRCommentId]
    }).save();


    const andreasReactAngularTLCommentId = mongoose.Types.ObjectId();
    const andreasReactAngularTLComment = new Comment({
        text: `I tried both of them and far, far prefer working in React.

        That said, you should try both of them and see if one fits you better than the other. There are plenty of tutorials out there that will help you get set up quickly and try them out.`,
        _id: andreasReactAngularTLCommentId,
        author: andrea._id,
        discussion: reactOrAngularPost._id,
        parents: [andreasReactAngularTLCommentId]
    }).save();

    const uhtredsReactAngularR2CommentId = mongoose.Types.ObjectId();
    const uhtredsReactAngularR2Comment = new Comment({
        text: `I did try both. What I didnt like about Angular is Typescript. What I didnt like about react is the inclusion of HTML in the javascript files.`,
        _id: uhtredsReactAngularR2CommentId,
        author: uhtred._id,
        discussion: reactOrAngularPost._id,
        parents: [andreasReactAngularTLCommentId, uhtredsReactAngularR2CommentId]
    }).save();

    const andreasReactAngularRCommentId = mongoose.Types.ObjectId();
    const andreasReactAngularRComment = new Comment({
        text: `The two things you didn't like are not mutually exclusive to either library, either. You can use react with typescript, and you can include HTML in your js templates (and commonly do) with angular.

    If that's all that's holding you back, you might want to dig in a little deeper. Also, typescript is probably one of the best things to come to the JS ecosystem in a long time - I'd definitely recommend reconsidering using it.`,
        _id: andreasReactAngularRCommentId,
        author: andrea._id,
        discussion: reactOrAngularPost._id,
        parents: [andreasReactAngularTLCommentId, uhtredsReactAngularR2CommentId, andreasReactAngularRCommentId]
    }).save();

    const monzasReactAngularRCommentId = mongoose.Types.ObjectId();
    const monzasReactAngularRComment = new Comment({
        text: `The two things you didn't like are not mutually exclusive to either library, either. You can use react with typescript, and you can include HTML in your js templates (and commonly do) with angular.

        If that's all that's holding you back, you might want to dig in a little deeper. Also, typescript is probably one of the best things to come to the JS ecosystem in a long time - I'd definitely recommend reconsidering using it.`,
        _id: monzasReactAngularRCommentId,
        author: monza._id,
        discussion: reactOrAngularPost._id,
        parents: [andreasReactAngularTLCommentId, uhtredsReactAngularR2CommentId, andreasReactAngularRCommentId, monzasReactAngularRCommentId]
    }).save();

    await Promise.all([
        andreaBase64TLComment,
        tyrionsBase64RComment,
        rebeccasBase64TLComment,
        marksBase64RComment,
        rebeccasBase64RComment,
        adamsSelfPubTLComment,
        tyrionsSelfPubRComment,
        obarasSelfPubRComment,
        logensSelfPubRComment,
        divonsSelfPubRComment,
        monzasSelfPubTLComment,
        uhtredsSelfPubRComment,
        yenneferssSelfPubTLComment,
        williamsCP2020TLComment,
        jeannesCP2020RComment,
        maximusCP2020TLComment,
        adamsCP2020TLComment,
        rebeccasCP2020RComment,
        tyrionsCP2020TLComment,
        monzasCP2020RComment,
        tyrionsCP2020RComment,
        monzasCP2020SRComment,
        adamsPrettierTLComment,
        ameliasPrettierRComment,
        yennefersPrettierRComment,
        divonsPrettierTLComment,
        adamsReviewTLComment,
        uhtredsReviewRComment,
        jeannesReviewTLComment,
        tyrionsReviewTLComment,
        obarasReviewRComment,
        uhtredsWitcherTLComment,
        adamsLearnModernJavaScriptTLComment,
        yennefersLearnModernJavaScriptRComment,
        tyrionsLearnModernJavaScriptTLComment,
        divonsLearnModernJavaScriptRComment,
        rebeccasLearnModernJavaScriptRComment,
        logensLearnModernJavaScriptRComment,
        andreasLearnModernJavaScriptRComment,
        obarasLearnModernJavaScriptRComment,
        rebeccasLearnModernJavaScriptR2Comment,
        jeannesLearnModernJavaScriptRComment,
        adamsReactAngularTLComment,
        ameliasReactAngularRComment,
        uhtredsReactAngularRComment,
        tyrionsReactAngularRComment,
        adamsReactAngularRComment,
        obarasReactAngularRComment,
        andreasReactAngularTLComment,
        uhtredsReactAngularR2Comment,
        andreasReactAngularRComment,
        monzasReactAngularRComment
    ]);


    */








    logger.log('Creating follows...');
    // Create the follows
    const adamFollowsAndrea = new Follow({follower: adam._id, followee: andrea._id}).save();
    const adamFollowsLogen = new Follow({follower: adam._id, followee: logen._id}).save();
    const adamFollowsMaximus = new Follow({follower: adam._id, followee: maximus._id}).save();
    const adamFollowsYennefer = new Follow({follower: adam._id, followee: yennefer._id}).save();
    const rebeccaFollowsAdam = new Follow({follower: rebecca._id, followee: adam._id}).save();
    const tyrionFollowsAdam = new Follow({follower: tyrion._id, followee: adam._id}).save();
    const rebeccaFollowsObara = new Follow({follower: rebecca._id, followee: obara._id}).save();

    await Promise.all([
        adamFollowsAndrea,
        adamFollowsLogen,
        adamFollowsMaximus,
        adamFollowsYennefer,
        rebeccaFollowsAdam,
        tyrionFollowsAdam,
        rebeccaFollowsObara
    ]);


    /*
    logger.log('Creating highlights...');
    // Create the highlights
    const adamsSelfPubHighlight = new Highlight({
        user: adam._id, 
        post: selfPubPost._id,
        excerpt: `I'm trying to find stuff to read, but I all I can find are $0.99 ebooks titled things like "Super Battle Mage Dark Blood" and the such.` 
    }).save();
    
    const adamsCP2020Highlight = new Highlight({
        user: adam._id, 
        post: CP2020Post._id,
        excerpt: `The best way around this that I have come up with is to have the first portion of the game vary depending on your class.` 
    }).save(); 
    
    const rebeccasPrettierHighlight = new Highlight({
        user: rebecca._id, 
        post: PrettierPost._id,
        excerpt: `I don't like it. I don't like the whole "rewrite from AST" approach.` 
    }).save(); 
    
    const andreasReviewHighlight = new Highlight({
        user: andrea._id, 
        post: ReviewPost._id,
        excerpt: `I feel like I can’t say that I enjoyed this book entirely because if I do then people may begin to question my sanity–because this book goes to some very, very, very dark places.`
    }).save(); 
    
    await Promise.all([
        adamsSelfPubHighlight,
        adamsCP2020Highlight,
        rebeccasPrettierHighlight,
        andreasReviewHighlight
    ]);
    */
    
    
    
    


    /*
    logger.log('Creating kudos...');
    // Create the kudos
    const adamsSelfPubKudos = new Kudos({user: adam._id, post: selfPubPost._id}).save();
    const adamsCP2020Kudos = new Kudos({user: adam._id, post: CP2020Post._id}).save();
    const rebeccasSelfPubKudos = new Kudos({user: rebecca._id, post: selfPubPost._id}).save();
    const andreasCP2020Kudos = new Kudos({user: andrea._id, post: CP2020Post._id}).save();

    await Promise.all([
        adamsSelfPubKudos,
        adamsCP2020Kudos,
        rebeccasSelfPubKudos,
        andreasCP2020Kudos
    ]);
    logger.log('Finished seeding the Database');
    */
}

seedTestDB();

