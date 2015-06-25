package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.junit.Assert.fail;

/**
 * <p>Helper/common methods for JSON schema/test validation</p>
 */
public abstract class AbstractTest {

    protected static final Logger LOGGER = LoggerFactory.getLogger(AbstractTest.class);

    private final JsonSchemaFactory factory = JsonSchemaFactory.byDefault();

    /**
     * @param fixtureName The name of the fixture in the same path as the test being executed, e.g. "credit".
     * @return
     * @throws IOException
     */
    JsonNode loadFixture(String fixtureName) throws IOException {
        String relativeFixturePath = getClass().getPackage().getName().replace(".", "/") + "/" + fixtureName + ".json";
        String fullFixturePathfile = getClass().getClassLoader().getResource(relativeFixturePath).getFile();
        return JsonLoader.fromPath(fullFixturePathfile);
    }

    /**
     * @param schemaName The name of the schema to load, e.g. "credit".  This method assumes the schemas
     * live under a classpath resource schema/ans/v0_2/
     * @return
     * @throws IOException
     */
    JsonNode loadSchema(String schemaName) throws IOException {
        String file = getClass().getClassLoader().getResource("schema/ans/v0_2/" + schemaName + ".json").getFile();
        return JsonLoader.fromPath(file);
    }

    /**
     * <p>Loads a JSON schema file from the classpath file found at getSchemaName() (as implemented by our subclass), then
     * uses that schema to validate a fixture file, checking that it passes/fails depending on the value of {@code expected}</p>
     * @param fixture The fixture file to validate against the schema pointed to by getSchemaName()
     * @param expected Whether or not you expect {@code} fixture to pass
     * @throws Exception
     */
    void runTest(String fixture, boolean expected) throws Exception {
        String schemaName = getSchemaName();
        JsonSchema schema = factory.getJsonSchema(loadSchema(schemaName));

        ProcessingReport report = schema.validate(loadFixture(fixture));
        if (expected != report.isSuccess()) {
            LOGGER.info("{} report = {}", fixture, report);
            fail(String.format("%s %s against %s schema", fixture, (expected ? "did not validate" : "validated"), schemaName));
        }
    }

    /**
     * @return The name of the schema file in src/main/resources/schema/ans/v0_2/ you want to load when validating a
     * schema via the {@code runTest(String, boolean)} method
     */
    abstract String getSchemaName();
}
