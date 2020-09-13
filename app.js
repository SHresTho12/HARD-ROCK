const button = document.getElementById('search-btn');
 button.addEventListener('click',function(){
     const search_value = document.getElementById('search_value').value;
     
    
     var ul = document.getElementById("song-list");
     while(ul.firstChild) ul.removeChild(ul.firstChild);

     document.getElementById('song_lyrics').innerText = ' ';
     document.getElementById('titleNameLyrics').innerText =' ';
     document.getElementById('artistNameLyrics').innerText = ' ';
 
    const api = `https://api.lyrics.ovh/suggest/${search_value}`;
    fetch(api)
    .then(res => res.json())
    
    
    .then(data => {
     
       for (let i = 0 ; i < 10 ; i++){
           const song_container = document.getElementById("song-list");
           const li = document.createElement('li'); //for every song it wiill add a list element
   
           const song_name = document.createElement('h3'); // song title
   const artist = document.createElement('h4');
           const div1 = document.createElement('div');
           const div2 = document.createElement('div');
   
           const song_album = document.createElement('h4'); // album name
   
        //    const lyric_button= document.createElement('button');// lyric button
   
           song_name.innerHTML = '<strong>Song name :</strong> ' + data.data[i].title;
           song_album.innerHTML = '<strong>Album by:</strong>   ' + data.data[i].album.title;
   artist.innerHTML= '<strong>song by :</strong>' + data.data[i].artist.name;
           li.className='song-detail single-result row d-flex flex-row align-items-center my-3 p-3';
   // 
           song_name.className='song-name';
           song_album.className='song-album';
        //    lyric_button.id='lyrics';
           div1.className='name-line col-md-9'
           div2.className='button col-md-3 text-md-right text-center'
        //    lyric_button.className='btn btn-success lyric-button ';
           let number = i ;
           div1.appendChild(song_name); div1.appendChild(song_album); div1.appendChild(artist); 
           div2.innerHTML=`<button class= "btn btn-success lyric-button " id = "lyrics" onclick = "getLyrics(${number})">Get lyrics</button>`
   
            li.appendChild(div1);
            li.appendChild(div2);
       //    li.appendChild(song_album);
        //  lyric_button.innerText=' Get lyrics'
        
           song_container.appendChild(li);
       
            
          
       }
   
        })
 

    }
    );
 function getLyrics(number){
    const searchInput = document.getElementById('search_value').value;
    const link = `https://api.lyrics.ovh/suggest/${searchInput}`;
    
    fetch(link)
    .then(res => res.json())
    .then(data =>{  
    
        const apiArtist = data.data[number].artist.name;
        const apiTitle = data.data[number].title;
        
        document.getElementById('artistNameLyrics').innerText = 'Song By :'+ apiArtist;
        document.getElementById('titleNameLyrics').innerText = 'Song name :'+ apiTitle; 
        fetch(`https://api.lyrics.ovh/v1/${apiArtist}/${apiTitle}`) //fetching the lyrics of the song
        .then(apiResponse => apiResponse.json())
        .then(apiData =>{
            if(apiData.lyrics == 'undefined'){
                document.getElementById('song_lyrics').innerText = 'Sorry, lyrics of this song is not available';
            }
            else{
                document.getElementById('song_lyrics').innerText = apiData.lyrics;
            }
        })
    });
 }