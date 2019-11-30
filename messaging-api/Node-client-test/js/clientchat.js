const socket = io()

const $form = document.querySelector("#chat-form")
const $buttonInForm = $form.querySelector("button")
const $messageFormText = $form.querySelector("input[name='Message-text']")
const $userToSend = $form.querySelector("input[name='User-tosend']")
const $messages = document.querySelector('#Message-OnBrowser').innerHTML
const $placeHolder = document.querySelector('#MessageContainer')

Url = location.search.split("=")
username = Url[1]

socket.on('message',(message)=>
{
    console.log(message)
    const html = Mustache.render($messages, {
        messagetorender: message.sentBy + "#####"+ message.message
    })
    $placeHolder.insertAdjacentHTML('beforeend',html)
})

document.querySelector("#chat-form").addEventListener('submit',(e) =>
{
    e.preventDefault()
    $buttonInForm.setAttribute('disabled','disabled')
    const message = document.querySelector("input[name='Message-text']").value
    const username = document.querySelector("input[name='User-tosend']").value
    console.log("here" + username)    
    socket.emit('sendMessage',username,message, (error) =>
    {
        $buttonInForm.removeAttribute('disabled')
        $messageFormText.value = ''
        $messageFormText.focus()
        $userToSend.value = ''
        $userToSend.focus()
        if(error)
        {
            console.log(error)
        }
        console.log("Message Delivered")
    })
})

document.querySelector('#sendlocation').addEventListener('click',() =>
{
    if (navigator.geolocation)
    {
        MyLocation = navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
        })
    }
    else
    {
        return alert("Brower does not support geolocation")
    }
    socket.emit('sendMyLocation', location)
})

socket.emit('ConnectToChat', username)