package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Content" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestContent extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "content";
    }

    @Test
    public void testContentGood() throws Exception {
        runTest("content-fixture-good", true);
    }

    @Test
    public void testContentBadMissingCreatedDate() throws Exception {
        runTest("content-fixture-bad-missing-created-date", false);
    }

    @Test
    public void testContentBadMalformedCreatedDate() throws Exception {
        runTest("content-fixture-bad-malformed-created-date", false);
    }
}
