package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Credit" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestCredit extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "credit";
    }

    @Test
    public void testCreditGood() throws Exception {
        runTest("credit-fixture-good", true);
    }

    @Test
    public void testCreditBadMissingName() throws Exception {
        runTest("credit-fixture-bad-missing-name", false);
    }
}
