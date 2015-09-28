package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "VideoStream" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestVideoStream extends AbstractTest<VideoStream> {
    
    @Override
    String getSchemaName() {
        return "video-stream";
    }

    @Override
    Class getTargetClass() {
        return VideoStream.class;
    }

    @Test
    public void testVideoStreamGood() throws Exception {
        testJsonValidation("video-stream-fixture-good", true);
        VideoStream videoStream = testClassSerialization("video-stream-fixture-good");
        assertThat(videoStream.getAudioCodec(), is("mpeg-3"));
        assertThat(videoStream.getVideoCodec(), is("mpeg-4"));
        assertThat(videoStream.getBitrate(), is(600));
        assertThat(videoStream.getFilesize(), is(4443944L));
        assertThat(videoStream.getHeight(), is(360));
        assertThat(videoStream.getWidth(), is(640));
        assertThat(videoStream.getUrl(), is("https://videos.posttv.com/washpost-production/The%20Washington%20Post/"
                + "20150701/55944729e4b082c8417f4483/55944904e4b0ef3ccc0da042_t_1435781395718_mobile.m3u8"));
        assertThat(videoStream.getProvider(), is("elastictranscoder"));
        assertThat(videoStream.getStreamType(), is("ts"));
    }
}
