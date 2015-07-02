package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_localed" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Located extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "trait_located";
    }

    @Test
    public void testTraitLocatedGood() throws Exception {
        runTest("trait-located-fixture-good", true);
    }
}
