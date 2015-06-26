package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Media" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestMedia extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "media";
    }

    @Test
    public void testMediaGood() throws Exception {
        runTest("media-fixture-good", true);
    }
}
