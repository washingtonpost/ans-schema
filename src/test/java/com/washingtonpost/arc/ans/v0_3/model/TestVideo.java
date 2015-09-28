package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Video" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestVideo extends AbstractANSTest<Video> {
    
    @Override
    String getSchemaName() {
        return "video";
    }

    @Override
    Class getTargetClass() {
        return Video.class;
    }

    @Test
    public void testVideoGood() throws Exception {
        testJsonValidation("video-fixture-good", true);
        Video video = testClassSerialization("video-fixture-good");
        assertThat(video.getType(), is("video"));
        assertThat(video.getDescription(), startsWith("We went out in 25+ knots"));
        assertThat(video.getCopyright(), is("(c) 2015, The Washington Post, Inc"));
        assertThat(video.getRating(), is("graphic"));
        assertThat(video.getVideoType(), is("clip"));
        assertThat(video.getYoutubeContentId(), is("nKW3wvhnZoE"));
        assertThat(video.getDuration(), is(139000L));
        assertThat(video.getTranscript(), startsWith("This is a transcript of all the words said in the video."));
        assertThat(video.getStreams().size(), is(2));
        assertThat(video.getStreams().get(0).getAudioCodec(), is(nullValue()));
        assertThat(video.getStreams().get(0).getHeight(), is(360));
        assertThat(video.getStreams().get(0).getWidth(), is(640));
        assertThat(video.getStreams().get(0).getFilesize(), is(4443944L));
        assertThat(video.getStreams().get(0).getStreamType(), is("ts"));
        assertThat(video.getStreams().get(0).getProvider(), is("elastictranscoder"));
        assertThat(video.getStreams().get(0).getBitrate(), is(600));
        assertThat(video.getStreams().get(0).getUrl(), startsWith("https://videos.posttv.com/washpost-product"));
        assertThat(video.getPromoImage().getWidth(), is(800));
    }

    /**
     * Just another happy-path test, with real data instead of fake fixture data.
     * @throws Exception
     */
    @Test
    public void testVideoNational() throws Exception {
        testJsonValidation("video-fixture-nationals", true);
    }
}
