package com.washingtonpost.arc.ans.v0_3.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_located" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Located extends AbstractTest<TraitLocated> {
    
    @Override
    String getSchemaName() {
        return "trait_located";
    }

    @Override
    Class getTargetClass() {
        return TraitLocated.class;
    }

    @Test
    public void testTraitLocatedGood() throws Exception {
        testJsonValidation("trait-located-fixture-good", true);
    }
}
