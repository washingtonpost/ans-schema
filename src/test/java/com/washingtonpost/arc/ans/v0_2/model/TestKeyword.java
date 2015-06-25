package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Keyword" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestKeyword extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "keyword";
    }

    @Test
    public void testKeywordGood() throws Exception {
        runTest("keyword-fixture-good", true);
    }

    @Test
    public void testKeywordBadNumericFrequency() throws Exception {
        runTest("keyword-fixture-bad-numeric-frequency", false);
    }
}
