package com.washingtonpost.arc.ans.v0_3.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_credited" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Credited extends AbstractTest<TraitCredited> {
    
    @Override
    String getSchemaName() {
        return "trait_credited";
    }

    @Override
    Class getTargetClass() {
        return TraitCredited.class;
    }

    @Test
    public void testTraitCreditedGood() throws Exception {
        testJsonValidation("trait-credited-fixture-good", true);
    }

    @Test
    public void testTraitCreditBadMissingCredit() throws Exception {
        testJsonValidation("trait-credited-fixture-bad-missing-credit", false);
    }
}
