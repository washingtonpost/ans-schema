package com.washingtonpost.arc.ans.v0_2.model;

import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import java.io.IOException;
import static org.junit.Assert.assertFalse;
import org.junit.Test;
import static org.junit.Assert.assertTrue;

/**
 * <p>Tests that JSON we expect to be a valid "Credit" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestCredit extends AbstractTest {


    @Test
    public void testCreditGood() throws IOException, ProcessingException {
        JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
        JsonSchema schema = factory.getJsonSchema(loadSchema("credit"));
        ProcessingReport report = schema.validate(loadFixture("credit-fixture-good"));
        System.err.println("testCreditGood = " + report);
        assertTrue("credit-fixture-good did not validate against credit schema", report.isSuccess());
    }

    @Test
    public void testCreditBadMissingName() throws IOException, ProcessingException {
        JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
        JsonSchema schema = factory.getJsonSchema(loadSchema("credit"));
        ProcessingReport report = schema.validate(loadFixture("credit-fixture-bad-missing-name"));
        System.err.println("testCreditBadMissingName = " + report);
        assertFalse("credit-fixture-bad validated against credit schema", report.isSuccess());
    }
}
