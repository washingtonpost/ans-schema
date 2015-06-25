package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Headline" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestHeadline extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "headline";
    }

    @Test
    public void testHeadlineGood() throws Exception {
        runTest("headline-fixture-good", true);
    }
}
