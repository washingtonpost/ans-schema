package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Geo" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestGeo extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "geo";
    }

    @Test
    public void testGeoGood() throws Exception {
        runTest("geo-fixture-good", true);
    }

    @Test
    public void testGeoBadMissingName() throws Exception {
        runTest("geo-fixture-bad-not-a-number", false);
    }
}
