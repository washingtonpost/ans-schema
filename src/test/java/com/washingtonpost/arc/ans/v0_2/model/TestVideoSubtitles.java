package com.washingtonpost.arc.ans.v0_2.model;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "VideoSubtitles" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestVideoSubtitles extends AbstractTest<VideoSubtitles> {
    
    @Override
    String getSchemaName() {
        return "video-subtitles";
    }

    @Override
    Class getTargetClass() {
        return VideoSubtitles.class;
    }

    @Test
    public void testVideoSubtitlesGood() throws Exception {
        testJsonValidation("video-subtitles-fixture-good", true);
        VideoSubtitles videoSubtitles = testClassSerialization("video-subtitles-fixture-good");
        assertThat(videoSubtitles.getConfidence(), is(0.75130093));
        assertThat(videoSubtitles.getUrls().size(), is(4));
        assertThat(videoSubtitles.getUrls().get(0).getFormat(), is("DFXP"));
        assertThat(videoSubtitles.getUrls().get(0).getUrl(), is("https://closedcaptions.posttv.com/06-30-2015/5592c09fe4"
                + "b082c8417f3f72_5592c013e4b082c8417f3f71/t_1435683757146.dfxp"));

        assertThat(videoSubtitles.getUrls().get(0).toString(), is(not(nullValue())));
    }

    @Test
    public void testVideoSubtitleUrlEqualsAndHashCode() {
        EqualsVerifier.forClass(VideoSubtitleUrl.class)
                    .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                    .verify();
    }
}
