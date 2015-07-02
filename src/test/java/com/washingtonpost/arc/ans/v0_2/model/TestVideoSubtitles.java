package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "VideoSubtitles" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestVideoSubtitles extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "video-subtitles";
    }

    @Test
    public void testVideoSubtitlesGood() throws Exception {
        runTest("video-subtitles-fixture-good", true);
    }
}
