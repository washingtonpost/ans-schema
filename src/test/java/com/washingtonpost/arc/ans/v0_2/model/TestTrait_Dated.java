package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_dated" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Dated extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "trait_dated";
    }

    @Test
    public void testTraitDatedGood() throws Exception {
        runTest("trait-dated-fixture-good", true);
    }

    @Test
    public void testTraitDatedBadDateFormat() throws Exception {
        runTest("trait-dated-fixture-bad-date-format", false);
    }
}
