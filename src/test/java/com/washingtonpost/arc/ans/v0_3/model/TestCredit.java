package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Credit" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestCredit extends AbstractTest<Credit> {
    
    @Override
    String getSchemaName() {
        return "credit";
    }

    @Override
    Class getTargetClass() {
        return Credit.class;
    }

    @Test
    public void testCreditGood() throws Exception {
        testJsonValidation("credit-fixture-good", true);
        Credit credit = testClassSerialization("credit-fixture-good");
        assertThat(credit.getName(), is("John Q. Reporter"));
        assertThat(credit.getOrg(), is("The Washington Post"));
        assertThat(credit.getRole(), is("Author"));
    }

    @Test
    public void testCreditBadMissingName() throws Exception {
        testJsonValidation("credit-fixture-bad-missing-name", false);
    }
}
