const axios 			= require('axios');
const moment 			= require('moment');

var express 			= require('express');
var app 				= express();

async function getHashtag(hashtag) {

	try {
		
		const getHashtag 		= await axios.get('https://www.instagram.com/explore/tags/'+ hashtag +'/');
		const data 				= getHashtag.data;

		var jsonReturn 			= [];

		if( data.split('window._sharedData =').pop().split(';</script>')[0] !== undefined ) {

			var sharedData 	= await JSON.parse( data.split('window._sharedData =').pop().split(';</script>')[0] );
			sharedData 		= await sharedData.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;

			for await ( var photo of sharedData ) {

				var push = await jsonReturn.push({
					image: photo.node.display_url,
					image_thumb: photo.node.thumbnail_resources[4].src,
					text: photo.node.edge_media_to_caption.edges[0].node.text,
					likes: photo.node.edge_liked_by.count,
					comments: photo.node.edge_media_to_comment.count,
					timestamp: photo.node.taken_at_timestamp,
					time_formated: moment.unix( photo.node.taken_at_timestamp ).format( 'DD/MM/YYYY [às] hh:mm:ss' ),
				});

			}

			return jsonReturn;
			
		}

	} catch (err) {
		console.log( err );
	}


}

app.get('/', async function (req, res) {
	res.send( { photos: await getHashtag('FormaturaAnaEPedro') } );
});
  
app.get('/api', async function (req, res) {
	res.send( { photos: await getHashtag('FormaturaAnaEPedro') } );
});
  
app.listen(3000, function () {
	console.log('App listening on port 3000!');
});