package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_id" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Id extends AbstractTest<TraitId> {
    
    @Override
    String getSchemaName() {
        return "trait_id";
    }

    @Override
    Class getTargetClass() {
        return TraitId.class;
    }

    @Test
    public void testTraitIdGood() throws Exception {
        testJsonValidation("trait-id-fixture-good", true);
    }

    @Test
    public void testTraitIdBadMissingId() throws Exception {
        testJsonValidation("trait-id-fixture-bad-missing-id", false);
    }
}
