const axios 			= require('axios');
const moment 			= require('moment-timezone');
const cors 				= require('cors');

var express 			= require('express');
var app 				= express();

const hashtag           = 'YourHashtag';

async function getHashtag(hashtag) {

	try {
		
		const getHashtag 		= await axios.get('https://www.instagram.com/explore/tags/'+ hashtag +'/');
		const data 				= getHashtag.data;

		var jsonReturn 			= [];

		if( data.split('window._sharedData =').pop().split(';</script>')[0] !== undefined ) {

			var sharedData 				= await JSON.parse( data.split('window._sharedData =').pop().split(';</script>')[0] );
			sharedData 					= await sharedData.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;

			for await ( var photo of sharedData ) {

				var caption = '';

				if(photo.node.accessibility_caption !== undefined)
					caption = photo.node.accessibility_caption.replace('No photo description available.', '').replace('Image may contain: ', '');

				var push = await jsonReturn.push({
					id: photo.node.id,
					image: photo.node.display_url,
					image_thumb: photo.node.thumbnail_resources[4].src,
					text: photo.node.edge_media_to_caption.edges[0].node.text,
					likes: photo.node.edge_liked_by.count,
					comments: photo.node.edge_media_to_comment.count,
					accessibility_caption: caption,
					time_formated: moment.unix( photo.node.taken_at_timestamp ).tz('America/Sao_Paulo').format( 'DD/MM [às] HH:mm' ),
				});

			}

			return jsonReturn.reverse();
			
		}

	} catch (err) {
		console.log( err );
	}


}

app.get('/', cors(), async function (req, res) {
	res.send( { photos: await getHashtag(hashtag) } );
});
  
app.get('/api', cors(), async function (req, res) {
	res.send( { photos: await getHashtag(hashtag) } );
});
  
app.listen(3000, function () {
	console.log('App listening on port 3000!');
});