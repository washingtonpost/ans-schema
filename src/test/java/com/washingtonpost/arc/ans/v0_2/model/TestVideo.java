package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Video" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestVideo extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "video";
    }

    @Test
    public void testVideoGood() throws Exception {
        runTest("video-fixture-good", true);
    }

    /**
     * Just another happy-path test, with real data instead of fake fixture data.
     * @throws Exception
     */
    @Test
    public void testVideoNational() throws Exception {
        runTest("video-fixture-nationals", true);
    }
}
