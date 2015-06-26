package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_credited" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Credited extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "trait_credited";
    }

    @Test
    public void testTraitCreditedGood() throws Exception {
        runTest("trait-credited-fixture-good", true);
    }

    @Test
    public void testTraitCreditBadMissingCredit() throws Exception {
        runTest("trait-credited-fixture-bad-missing-credit", false);
    }
}
