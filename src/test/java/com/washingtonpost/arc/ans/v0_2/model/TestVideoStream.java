package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "VideoStream" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestVideoStream extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "video-stream";
    }

    @Test
    public void testVideoStreamGood() throws Exception {
        runTest("video-stream-fixture-good", true);
    }
}
