package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_locale" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Locale extends AbstractTest<TraitLocale> {
    
    @Override
    String getSchemaName() {
        return "trait_locale";
    }

    @Override
    Class getTargetClass() {
        return TraitLocale.class;
    }

    @Test
    public void testTraitLocaleGood() throws Exception {
        testJsonValidation("trait-locale-fixture-good", true);
    }
}
