// var element = document.querySelector(".theoplayer-container")
// console.log("Hello " + element, THEOplayer)
// localStorage.setItem("THEOplayer", THEOplayer["Player"])
// var THEOplayer1 = THEOplayer
// console.log(THEOplayer1)
// console.log(THEOplayer)
// var player = new THEOplayer.Player(null, {
//     libraryLocation: "https://cdn.myth.theoplayer.com/d9e455e0-8285-4e91-9f57-e22788dda8d8"
// })
// var player = new THEOplayer.Player(element, {
//     libraryLocation: "https://cdn.myth.theoplayer.com/d9e455e0-8285-4e91-9f57-e22788dda8d8"
// })

// export { THEOplayer1 }

// module.exports
// export { THEOplayer1 }
// export default THEOplayer
// // OPTIONAL CONFIGURATION
// // Customized video player parameters
// player.source = {
//     sources: [{
//         "src": "https://storage.cloud.google.com/medialabs_contentdedup_devbucket/final_videos/Titanic%20-%20Official%20Trailer%20(HD)-240p.mp4",
//         "type": "video/mp4"
//     }],
//     // Advertisement configuration
//     ads: [{
//         "sources": "//cdn.theoplayer.com/demos/preroll.xml",
//         "timeOffset": "start",
//         "skipOffset": 2
//     }]
// }
// console.log(player)

// player.preload = 'auto';

// // Related content configuration
// player.related.sources = [{
//     "image": "//cdn.theoplayer.com/video/big_buck_bunny/poster.jpg",
//     "title": "Big buck bunny",
//     "duration": "9:57",
//     "source": {
//         "sources": [{
//             "src": "//cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8",
//             "type": "application/x-mpegurl"
//         }]
//     }
// }, {
//     "image": "//cdn2.hubspot.net/hubfs/2163521/Demo_zone/CaminandesLlamaDramaPoster.jpg",
//     "title": "4K Streaming with THEOplayer",
//     "duration": "1:30",
//     "source": {
//         "sources": [{
//             "src": "//amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)",
//             "type": "application/x-mpegurl"
//         }]
//     }
// }, {
//     "image": "//cdn.theoplayer.com/video/sintel/poster.jpg",
//     "title": "Sintel",
//     "duration": "14:47",
//     "source": {
//         "sources": [{
//             "src": "https://cdn.theoplayer.com/video/sintel/nosubs.m3u8",
//             "type": "application/x-mpegurl"
//         }]
//     }
// }, {
//     "image": "//cdn2.hubspot.net/hubfs/2163521/Demo_zone/tears_of_steel_poster.jpg",
//     "title": "Tears of steel",
//     "duration": "14:47",
//     "source": {
//         "sources": [{
//             "src": "https://cdn.theoplayer.com/video/elephants-dream/playlist-single-audio.m3u8",
//             "type": "application/x-mpegurl"
//         }]
//     }
// }];
// // Up next configuration
// player.upnext.bar.offset = 100;
// player.upnext.source = {
//     "image": "//cdn.theoplayer.com/video/big_buck_bunny/poster.jpg",
//     "title": "Big buck bunny",
//     "duration": "9:57",
//     "link": "#"
// };
// // Social configuration
// player.social.url = "http://demo.theoplayer.com/social-sharing";
// player.social.items = [{
//     "label": "Facebook",
//     "icon": "https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png",
//     "src": "http://www.facebook.com/sharer/sharer.php?u=<URL>"
// }, {
//     "label": "Twitter",
//     "icon": "https://s-media-cache-ak0.pinimg.com/originals/f3/6f/51/f36f511b261596a2debe85d844bb1b87.png",
//     "src": "http://twitter.com/intent/tweet?url=<URL>"
// }, {
//     "label": "Reddit",
//     "icon": "https://vignette3.wikia.nocookie.net/hayday/images/1/10/Reddit.png/revision/latest?cb=20160713122603",
//     "src": "http://www.reddit.com/submit?url=<URL>"
// }, {
//     "label": "Direct link",
//     "src": "http://demo.theoplayer.com/social-sharing"
// }, {
//     "label": "Embed",
//     "text": "<iframe width=\"640\" height=\"360\" src=\"http://demo.theoplayer.com/social-sharing\" frameborder=\"0\" allowfullscreen>\n</iframe>"
// }];
