function ConvertYoutubeId(url: string) {
    return url.length === 11
        ? url
        : url.split('https://youtu.be/')[1]
        ? url.split('https://youtu.be/')[1].slice(0, 11)
        : url.split('https://youtube.com/watch?v=')[1]
        ? url.split('https://youtube.com/watch?v=')[1].slice(0, 11)
        : url.split('https://www.youtube.com/watch?v=')[1]
        ? url.split('https://www.youtube.com/watch?v=')[1].slice(0, 11)
        : url.split('https://m.youtube.com/watch?v=')[1]
        ? url.split('https://m.youtube.com/watch?v=')[1].slice(0, 11)
        : null
}

export default ConvertYoutubeId
